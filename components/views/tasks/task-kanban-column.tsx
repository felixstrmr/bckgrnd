'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { TaskStatus } from '@/types'
import { TaskWithRelations } from '@/types/custom'
import { useDroppable } from '@dnd-kit/core'
import { MoreVertical, Plus } from 'lucide-react'

type Props = {
  tasks: TaskWithRelations[]
  taskStatus: TaskStatus
}

export default function TaskKanbanColumn({ tasks, taskStatus }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex h-fit flex-col space-y-2 rounded-xl border p-2 transition-colors ${
        isOver ? 'bg-black/10' : 'bg-muted'
      }`}
    >
      <div className='flex w-64 min-w-64 items-center justify-between p-1'>
        <div className='flex items-center'>
          <div className='flex w-fit items-center gap-2'>
            <DynamicIcon
              icon={taskStatus.icon}
              style={{ color: taskStatus.color }}
            />
            <p className='text-sm'>{taskStatus.name}</p>
          </div>
          <p className='ml-2 text-sm text-muted-foreground'>{tasks.length}</p>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            className='size-7 min-w-7 rounded-sm hover:bg-black/10'
            size='icon'
          >
            <Plus className='size-4 text-muted-foreground' />
          </Button>
          <Button
            variant='ghost'
            className='size-7 min-w-7 rounded-sm hover:bg-black/10'
            size='icon'
          >
            <MoreVertical className='size-4 text-muted-foreground' />
          </Button>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className='flex flex-col space-y-2'>
          {tasks.map((task) => (
            <TaskKanbanItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
