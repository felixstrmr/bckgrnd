'use client'

import CreateTaskCommentForm from '@/components/forms/create-task-comment-form'
import TaskCommentSkeleton from '@/components/skeletons/task-comment-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getTaskComments } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { cn, formatRelativeTime } from '@/lib/utils'
import { TaskCommentWithRelations } from '@/types/custom'
import { RealtimeChannel } from '@supabase/supabase-js'
import React, { useMemo } from 'react'

type Props = {
  domain: string
  taskId: string
  workspaceId: string
}

export default function TaskComments({ domain, taskId, workspaceId }: Props) {
  const [comments, setComments] = React.useState<TaskCommentWithRelations[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const supabase = useMemo(() => createClient(), [])

  const fetchComments = React.useCallback(async () => {
    try {
      const { data: taskComments, error } = await getTaskComments(
        supabase,
        domain,
        taskId,
      )

      if (error) throw error

      setComments(taskComments ?? [])
      setError(null)
    } catch (error) {
      setError((error as Error).message)
      setComments([])
    }
  }, [supabase, domain, taskId])

  React.useEffect(() => {
    let channel: RealtimeChannel | undefined

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
          async () => {
            await fetchComments()
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
    <div
      className={cn(
        'flex flex-col space-y-6 pt-4',
        comments.length === 0 && 'h-full',
      )}
    >
      {loading ? (
        <TaskCommentSkeleton />
      ) : error ? (
        <div className='flex h-full items-center justify-center'>
          <p className='text-sm text-destructive'>{error}</p>
        </div>
      ) : comments.length === 0 ? (
        <div className='flex h-full items-center justify-center'>
          <p className='text-sm text-muted-foreground'>No comments yet.</p>
        </div>
      ) : (
        <div className='flex flex-col space-y-6'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='flex gap-2 animate-in slide-in-from-bottom-3'
            >
              <Avatar className='size-9'>
                <AvatarImage
                  src={comment.user?.avatar_url || ''}
                  alt={comment.user.display_name}
                />
                <AvatarFallback>
                  {comment.user?.display_name
                    ?.split(' ')
                    .map((name) => name[0])
                    .join('') ?? '??'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center space-x-2'>
                  <h6 className='text-sm font-medium'>
                    {comment.user.display_name}
                  </h6>
                  <p className='text-xs text-muted-foreground'>
                    {formatRelativeTime(new Date(comment.created_at))}
                  </p>
                </div>
                <div className={cn('mt-0', comment.image && 'mt-1')}>
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
          ))}
        </div>
      )}
      <div className='mt-auto'>
        <CreateTaskCommentForm taskId={taskId} workspaceId={workspaceId} />
      </div>
    </div>
  )
}
