'use client'

import PriorityLow from '@/components/icons/solid/priority-low'
import ProfilePicture from '@/components/profile-picture'
import { Task } from '@/components/views/tasks/task-kanban-view'
import { formatRelativeDate } from '@/lib/utils'
import { useDraggable } from '@dnd-kit/core'
import { Box, Clock, Files, MessageCircle, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  task: Task
}

export default function TaskKanbanItem({ task }: Props) {
  const router = useRouter()

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || (e.target as HTMLElement).closest('[data-grip-handle]')) {
      e.preventDefault()
      return
    }
    router.push(`/dashboard/tasks/${task.id}`)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 50 : undefined,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onClick={handleClick}
      className='w-64 rounded-md border bg-background p-4 shadow-sm transition-shadow hover:z-50 hover:shadow-lg'
    >
      <div className='mb-4 flex items-center justify-between'>
        <div>
          {task.client ? (
            <div className='flex items-center gap-1 text-muted-foreground'>
              <User className='size-3' />
              <p className='text-xs'>{task.client.name}</p>
            </div>
          ) : (
            task.project && (
              <div className='flex items-center gap-1 text-muted-foreground'>
                <Box className='size-3' />
                <p className='text-xs'>{task.project.name}</p>
              </div>
            )
          )}
        </div>
        <div className='flex items-center -space-x-2'>
          {task.assignees?.map((assignee) => (
            <ProfilePicture
              key={assignee.user.email}
              name={assignee.user.name || assignee.user.email}
              avatar={assignee.user.avatar!}
              size='xs'
            />
          ))}
        </div>
      </div>
      <p className='truncate font-semibold tracking-tight'>{task.name}</p>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <PriorityLow className='size-4' />
          <div className='flex h-6 items-center gap-1 rounded-md bg-muted px-2 text-xs text-muted-foreground'>
            <Clock className='size-3' />
            {task.due_date ? formatRelativeDate(task.due_date) : 'n/a'}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Files className='size-3' />0
          </div>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <MessageCircle className='size-3' />0
          </div>
        </div>
      </div>
    </div>
  )
}
