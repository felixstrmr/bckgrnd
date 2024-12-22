'use client'

import TaskStatusIcon from '@/components/task-status-icon'
import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { Task, TaskStatus } from '@/components/views/tasks/task-kanban-view'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'

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
        'flex h-fit flex-col rounded-2xl p-1 transition-all',
        isOver ? 'bg-muted' : 'bg-muted/50',
      )}
    >
      <div className='flex items-center gap-2 px-3 py-2'>
        <TaskStatusIcon name={taskStatus.name} color={taskStatus.color} />
        <p className='text-sm'>{taskStatus.name}</p>
        <p className='text-xs text-muted-foreground'>{tasks.length}</p>
        <button className='ml-auto text-muted-foreground transition-colors hover:text-foreground'>
          <Plus className='size-4' />
        </button>
      </div>
      <div className='w-64 min-w-64 space-y-1'>
        {tasks.map((task) => (
          <TaskKanbanItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
