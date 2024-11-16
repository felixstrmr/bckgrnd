'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { TaskWithRelations } from '@/types/custom'
import { useDraggable } from '@dnd-kit/core'
import { LinkIcon, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CSSProperties, MouseEvent } from 'react'

type Props = {
  task: TaskWithRelations
}

export default function TaskKanbanItem({ task }: Props) {
  const router = useRouter()
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const style: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: 'relative',
    zIndex: isDragging ? 50 : undefined,
    opacity: 1,
    touchAction: 'none',
  }

  const handleClick = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      return
    }

    if ((e.target as HTMLElement).closest('[data-grip-handle]')) {
      e.preventDefault()
      return
    }

    router.push(`/tasks/${task.id}`)
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className='w-64 min-w-64'
    >
      <div
        onClick={handleClick}
        className='group block cursor-pointer overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md'
      >
        <div className='flex items-center gap-1 p-4'>
          <DynamicIcon
            icon={task.priority.icon}
            style={{ color: task.priority.color }}
          />
          <p className='text-xs'>{task.priority.name}</p>
        </div>
        <div className='flex items-center px-4 group-hover:gap-1'>
          <h6 className='truncate no-underline transition-all'>{task.name}</h6>
        </div>
        <div className='mt-4 flex items-center justify-between border-t bg-muted/50 p-4 py-3'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <LinkIcon className='size-3 text-muted-foreground' />
              <p className='text-xs'>0</p>
            </div>
            <div className='flex items-center gap-1'>
              <MessageCircle className='size-3 text-muted-foreground' />
              <p className='text-xs'>0</p>
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
