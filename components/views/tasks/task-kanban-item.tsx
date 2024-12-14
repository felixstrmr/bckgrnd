'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TaskWithRelations } from '@/types/custom'
import { useDraggable } from '@dnd-kit/core'
import { History, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  task: TaskWithRelations
}

export default function TaskKanbanItem({ task }: Props) {
  const router = useRouter()

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault()
      return
    }

    if ((e.target as HTMLElement).closest('[data-grip-handle]')) {
      e.preventDefault()
      return
    }

    router.push(`/dashboard/tasks/${task.id}`)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className='flex flex-col rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md'
    >
      <div onClick={handleClick}>
        <div className='flex items-center justify-between px-4 pb-2 pt-4'>
          <div className='flex items-center gap-1'>
            <DynamicIcon
              icon={task.priority.icon}
              style={{ color: task.priority.color }}
              className='size-3'
            />
            <p className='text-sm text-muted-foreground'>
              {task.priority.name}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Avatar className='size-6'>
              <AvatarFallback className='size-6 text-[10px]'>FS</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className='p-4 pt-0'>
          <h5 className='truncate'>{task.name}</h5>
        </div>
        <div className='flex items-center gap-3 rounded-b-lg border-t bg-muted px-4 py-2 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <History className='size-3' />0
          </div>
          <div className='flex items-center gap-1'>
            <MessageCircle className='size-3' />0
          </div>
        </div>
      </div>
    </div>
  )
}
