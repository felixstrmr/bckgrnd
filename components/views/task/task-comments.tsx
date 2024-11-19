'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { getTaskComments } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { formatRelativeTime } from '@/lib/utils'
import { TaskCommentWithRelations } from '@/types/custom'
import { RealtimeChannel } from '@supabase/supabase-js'
import React, { useMemo } from 'react'

type Props = {
  domain: string
  taskId: string
}

export default function TaskComments({ domain, taskId }: Props) {
  const [comments, setComments] = React.useState<TaskCommentWithRelations[]>([])
  const [loading, setLoading] = React.useState(true)
  const supabase = useMemo(() => createClient(), [])

  const fetchComments = React.useCallback(async () => {
    const { data: taskComments, error } = await getTaskComments(
      supabase,
      domain,
      taskId,
    )

    if (!error && taskComments) {
      setComments(taskComments)
    }
  }, [supabase, domain, taskId])

  React.useEffect(() => {
    let channel: RealtimeChannel

    const setupRealtimeSubscription = async () => {
      setLoading(true)
      await fetchComments()
      setLoading(false)

      channel = supabase
        .channel('task-comments')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'task_comments',
            filter: `task=eq.${taskId}`,
          },
          (payload) => {
            switch (payload.eventType) {
              case 'INSERT':
                setComments((prev) => [
                  ...prev,
                  payload.new as TaskCommentWithRelations,
                ])
                break
              case 'DELETE':
                setComments((prev) =>
                  prev.filter((comment) => comment.id !== payload.old.id),
                )
                break
              case 'UPDATE':
                setComments((prev) =>
                  prev.map((comment) =>
                    comment.id === payload.new.id
                      ? (payload.new as TaskCommentWithRelations)
                      : comment,
                  ),
                )
                break
            }
          },
        )
        .subscribe()
    }

    setupRealtimeSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [supabase, fetchComments, taskId])

  return (
    <div className='pr-4 pt-4'>
      <div className='flex flex-col space-y-6'>
        {loading ? (
          <Skeleton className='h-10 w-full' />
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className='flex gap-2'>
              <Avatar className='size-9'>
                <AvatarFallback>
                  {comment.user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center space-x-2'>
                  <h6 className='text-sm font-medium'>{comment.user.email}</h6>
                  <p className='text-xs text-muted-foreground'>
                    {formatRelativeTime(new Date(comment.created_at))}
                  </p>
                </div>
                <div className='mt-1'>
                  <div className='whitespace-pre-wrap text-sm'>
                    {comment.image && (
                      <span className='mr-1.5 inline-block -translate-y-0.5 rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground shadow-sm'>
                        V{comment.image.version}
                      </span>
                    )}
                    {comment.message}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
