'use client'

import { Task } from '@/types'
import { useDraggable } from '@dnd-kit/core'
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
      className='w-64 rounded-md border bg-background p-4 shadow-sm'
    >
      <p className='font-semibold tracking-tight'>{task.name}</p>
    </div>
  )
}
