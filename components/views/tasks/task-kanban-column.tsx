'use client'

import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { STATUS_ICONS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Task, TaskStatus } from '@/types'
import { useDroppable } from '@dnd-kit/core'

type Props = {
  taskStatus: TaskStatus
  tasks: Task[]
}

export default function TaskKanbanColumn({ taskStatus, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex h-fit flex-col gap-2 rounded-2xl p-1 transition-all',
        isOver ? 'bg-muted' : 'bg-muted/50',
      )}
    >
      <div className='flex items-center gap-2 px-3 pb-0 pt-2'>
        <StatusIcon name={taskStatus.name} color={taskStatus.color} />
        <p className='text-sm'>{taskStatus.name}</p>
      </div>
      <div className='w-64'>
        {tasks.map((task) => (
          <TaskKanbanItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

function StatusIcon({
  name = '',
  color = 'currentColor',
  className,
}: {
  name: string
  color: string
  className?: string
}) {
  const IconComponent = STATUS_ICONS[name as keyof typeof STATUS_ICONS]
  return IconComponent ? (
    <IconComponent className={cn('size-4', className)} color={color} />
  ) : null
}
