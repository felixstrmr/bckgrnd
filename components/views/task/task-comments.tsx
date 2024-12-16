'use client'

import CreateTaskCommentForm from '@/components/forms/create-task-comment-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/clients/supabase/client'
import { formatRelativeTime } from '@/lib/utils'
import { getTaskComments } from '@/queries'
import { Task } from '@/types'
import { TaskCommentWithRelations } from '@/types/custom'
import { RealtimeChannel } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
  userId: string
  task: Task & {
    workspace: { id: string; domain: string }
    client: { id: string; name: string } | null
    project: { id: string; name: string } | null
    priority: { name: string; icon: string; color: string }
    status: { name: string; icon: string; color: string }
  }
}

export default function TaskComments({ userId, task }: Props) {
  const [comments, setComments] = React.useState<TaskCommentWithRelations[]>([])
  const [loading, setLoading] = React.useState(true)
  const supabase = createClient()

  const fetchComments = React.useCallback(async () => {
    try {
      const taskComments = await getTaskComments(
        supabase,
        task.workspace.domain,
        task.id,
      )
      setComments(taskComments ?? [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setComments([])
    }
  }, [supabase, task.workspace.domain, task.id])

  React.useEffect(() => {
    let channel: RealtimeChannel

    async function setupRealtimeSubscription() {
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
            filter: `task=eq.${task.id}`,
          },
          fetchComments,
        )
        .subscribe()
    }

    setupRealtimeSubscription()
    return () => {
      channel?.unsubscribe()
    }
  }, [supabase, fetchComments, task.id])

  const userInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
  }

  return (
    <div className='flex size-full flex-col justify-between p-4'>
      <div className='flex-1 overflow-y-auto scroll-smooth'>
        <p className='mb-4 text-xs'>Comments</p>
        {loading ? (
          <div className='flex size-full items-center justify-center'>
            <Loader2 className='size-4 animate-spin' />
          </div>
        ) : comments.length > 0 ? (
          <div className='flex flex-col space-y-4'>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className='flex items-start gap-2 animate-in fade-in-0 slide-in-from-bottom-1'
              >
                <Avatar className='size-6 shrink-0'>
                  <AvatarImage
                    src={comment.user.avatar ?? undefined}
                    alt={comment.user.display_name ?? undefined}
                  />
                  <AvatarFallback className='text-[0.6rem]'>
                    {userInitials(comment.user.display_name ?? '')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='-mt-1 flex items-center gap-2'>
                    <p className='text-sm'>
                      {comment.user.id === userId
                        ? 'You'
                        : comment.user.display_name}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {formatRelativeTime(new Date(comment.created_at))}
                    </p>
                  </div>
                  <p>{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex size-full items-center justify-center'>
            <p className='text-sm text-muted-foreground'>No comments yet.</p>
          </div>
        )}
      </div>
      <CreateTaskCommentForm
        taskId={task.id}
        workspaceId={task.workspace.id}
        fileId={undefined}
      />
    </div>
  )
}
