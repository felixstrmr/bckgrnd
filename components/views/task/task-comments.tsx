'use client'

import CreateTaskCommentForm from '@/components/forms/create-task-comment-form'
import ProfilePicture from '@/components/profile-picture'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/clients/supabase/client'
import { getTaskComments } from '@/lib/queries'
import { formatRelativeDate } from '@/lib/utils'
import { RealtimeChannel } from '@supabase/supabase-js'
import React from 'react'

type TaskComment = {
  id: string
  message: string
  created_at: string
  user: {
    name: string | null
    email: string
    avatar: string | null
  }
}

type Props = {
  domain: string
  taskId: string
  workspaceId: string
}

export default function TaskComments({ domain, taskId, workspaceId }: Props) {
  const [comments, setComments] = React.useState<TaskComment[]>([])
  const [loading, setLoading] = React.useState(true)

  const supabase = createClient()

  const fetchComments = React.useCallback(async () => {
    try {
      const comments = await getTaskComments(supabase, domain, taskId)
      setComments(comments ?? [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setComments([])
    }
  }, [supabase, domain, taskId])

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
            filter: `task=eq.${taskId}`,
          },
          fetchComments,
        )
        .subscribe()
    }

    setupRealtimeSubscription()
    return () => {
      channel?.unsubscribe()
    }
  }, [supabase, fetchComments, taskId])

  return (
    <div className='flex size-full flex-col'>
      <div className='p-4'>
        <p className='text-xs'>Comments</p>
      </div>
      <div className='flex h-full flex-col px-4'>
        {loading ? (
          <div className='flex flex-col space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex items-center gap-2'>
                <Skeleton className='size-8 rounded-full' />
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-24 rounded-sm' />
                    <Skeleton className='h-4 w-16 rounded-sm' />
                  </div>
                  <Skeleton className='h-4 w-[200px] rounded-sm' />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className='flex flex-col space-y-4'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex items-start gap-2'>
                <ProfilePicture
                  name={comment.user.name ?? comment.user.email ?? ''}
                  avatar={comment.user.avatar ?? undefined}
                  className='mt-1'
                />
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-semibold'>{comment.user.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {formatRelativeDate(comment.created_at)}
                    </p>
                  </div>
                  <p className='text-sm'>{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex size-full flex-col items-center justify-center'>
            <p className='text-sm text-muted-foreground'>No comments yet.</p>
          </div>
        )}
      </div>
      <div className='p-4'>
        <CreateTaskCommentForm taskId={taskId} workspaceId={workspaceId} />
      </div>
    </div>
  )
}
