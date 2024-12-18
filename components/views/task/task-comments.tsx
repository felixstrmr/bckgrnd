'use client'

import CreateTaskCommentForm from '@/components/forms/create-task-comment-form'
import TaskCommentSkeleton from '@/components/skeletons/task-comment-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTaskVersion } from '@/hooks/use-task-version'
import { getTaskComments } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { cn, formatRelativeTime } from '@/lib/utils'
import { User } from '@/types'
import {
  TaskCommentWithRelations,
  TaskImageWithRelations,
} from '@/types/custom'
import { RealtimeChannel } from '@supabase/supabase-js'
import React, { useMemo } from 'react'

type Props = {
  domain: string
  taskId: string
  workspaceId: string
  projectId: string
  taskImages: TaskImageWithRelations[]
  user: User
}

export default function TaskComments({
  domain,
  taskId,
  workspaceId,
  projectId,
  taskImages,
  user,
}: Props) {
  const [comments, setComments] = React.useState<TaskCommentWithRelations[]>([])
  const [loading, setLoading] = React.useState(true)
  const supabase = useMemo(() => createClient(), [])

  const { selectedImage } = useTaskVersion(taskImages)

  const fetchComments = React.useCallback(async () => {
    try {
      const { data: taskComments, error } = await getTaskComments(
        supabase,
        domain,
        taskId,
      )

      if (error) throw error

      setComments(taskComments ?? [])
    } catch (error) {
      console.error(error)
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
    <div className='relative flex size-full flex-col overflow-auto'>
      {loading ? (
        <div className='absolute inset-0 flex flex-col space-y-6 bg-background'>
          <TaskCommentSkeleton className='' />
        </div>
      ) : comments.length === 0 ? (
        <div className='flex size-full flex-col items-center justify-center text-center'>
          <p className='text-sm text-muted-foreground'>No comments yet.</p>
        </div>
      ) : (
        <ScrollArea className='my-4 flex-1'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='flex gap-2 py-2 animate-in slide-in-from-bottom-3'
            >
              <Avatar className='size-9'>
                <AvatarImage src={comment.user?.avatar_url || ''} />
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
                    {comment.user.id === user.id
                      ? 'You'
                      : comment.user.display_name}
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
        </ScrollArea>
      )}
      <div className='mt-auto'>
        <CreateTaskCommentForm
          taskId={taskId}
          workspaceId={workspaceId}
          selectedVersion={selectedImage?.id ?? null}
          domain={domain}
          projectId={projectId}
        />
      </div>
    </div>
  )
}
