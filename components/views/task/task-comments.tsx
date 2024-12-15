'use client'

import CreateTaskCommentForm from '@/components/forms/create-task-comment-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/clients/supabase/client'
import { formatRelativeTime } from '@/lib/utils'
import { getTaskComments } from '@/queries'
import { TaskCommentWithRelations } from '@/types/custom'
import { RealtimeChannel } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

interface CommentItemProps {
  comment: TaskCommentWithRelations
  taskFileVersions: Array<{ id: string; version: number }>
}

interface TaskCommentsProps {
  taskId: string
  domain: string
  workspaceId: string
  fileId?: string
  taskFileVersions: Array<{ id: string; version: number }>
}

type GroupedComments = Record<string, TaskCommentWithRelations[]>

const COMMENT_DATE_GROUPS = {
  TODAY: 'Today',
  YESTERDAY: 'Yesterday',
} as const

function CommentItem({ comment, taskFileVersions }: CommentItemProps) {
  const version = taskFileVersions.find((v) => v.id === comment.file)?.version

  return (
    <div className='group flex items-start gap-3 rounded-md p-2 transition-all animate-in fade-in-0 slide-in-from-bottom-3 hover:bg-muted/50'>
      <Avatar className='size-8 shrink-0'>
        <AvatarImage
          src={comment.user.avatar ?? undefined}
          alt={comment.user.display_name ?? undefined}
        />
        <AvatarFallback>{comment.user.email[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex-1 space-y-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>
              {comment.user.display_name}
            </span>
            <time className='text-xs text-muted-foreground'>
              {formatRelativeTime(new Date(comment.created_at))}
            </time>
          </div>
          {version && <p className='text-xs'>V{version}</p>}
        </div>
        <p className='text-sm leading-relaxed text-foreground/90'>
          {comment.message}
        </p>
      </div>
    </div>
  )
}

function CommentSkeleton() {
  return (
    <div className='flex items-center justify-center p-8'>
      <Loader2 className='size-5 animate-spin text-muted-foreground' />
    </div>
  )
}

function EmptyComments() {
  return (
    <div className='flex h-full items-center justify-center'>
      <p className='text-sm text-muted-foreground'>No comments yet</p>
    </div>
  )
}

function groupCommentsByDate(
  comments: TaskCommentWithRelations[],
): GroupedComments {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  return comments.reduce((groups: GroupedComments, comment) => {
    const date = new Date(comment.created_at)
    let groupKey: string

    if (date.toDateString() === today.toDateString()) {
      groupKey = COMMENT_DATE_GROUPS.TODAY
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = COMMENT_DATE_GROUPS.YESTERDAY
    } else {
      groupKey = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }

    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), comment],
    }
  }, {})
}

export function TaskComments({
  taskId,
  domain,
  workspaceId,
  fileId,
  taskFileVersions,
}: TaskCommentsProps) {
  const [comments, setComments] = React.useState<TaskCommentWithRelations[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const supabase = createClient()

  const fetchComments = React.useCallback(async () => {
    try {
      const taskComments = await getTaskComments(supabase, domain, taskId)
      setComments(taskComments ?? [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setComments([])
    }
  }, [supabase, domain, taskId])

  React.useEffect(() => {
    let channel: RealtimeChannel

    async function setupRealtimeSubscription() {
      setIsLoading(true)
      await fetchComments()
      setIsLoading(false)

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

  const groupedComments = React.useMemo(() => {
    const sortedComments = [...comments].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
    return groupCommentsByDate(sortedComments)
  }, [comments])

  return (
    <aside className='flex h-full w-1/4 min-w-96 flex-col rounded-lg border bg-background p-4 shadow-sm'>
      <header className='flex items-center justify-between pb-4'>
        <div className='flex items-center gap-2'>
          <h4 className='font-medium'>Comments</h4>
          <Badge variant='secondary'>{comments.length}</Badge>
        </div>
      </header>

      <Suspense fallback={<CommentSkeleton />}>
        <div className='scrollbar-hide flex-1 space-y-6 overflow-y-auto'>
          {isLoading ? (
            <CommentSkeleton />
          ) : comments.length > 0 ? (
            Object.entries(groupedComments).map(([date, dateComments]) => (
              <section key={date} className='space-y-3'>
                <div className='sticky top-0 flex items-center gap-2 bg-background/95 py-2 backdrop-blur'>
                  <Separator className='flex-1' />
                  <span className='text-xs font-medium text-muted-foreground'>
                    {date}
                  </span>
                  <Separator className='flex-1' />
                </div>
                <div className='space-y-2'>
                  {dateComments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      taskFileVersions={taskFileVersions}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <EmptyComments />
          )}
        </div>
      </Suspense>

      <footer className='mt-4 pt-4'>
        <CreateTaskCommentForm
          taskId={taskId}
          workspaceId={workspaceId}
          fileId={fileId}
        />
      </footer>
    </aside>
  )
}
