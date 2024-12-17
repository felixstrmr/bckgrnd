'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { cn } from '@/lib/utils'
import { TasksWithRelations } from '@/queries/task'
import { useCreateTaskDialog } from '@/store/use-create-task-dialog'
import { TaskStatus } from '@/types'

import { useDroppable } from '@dnd-kit/core'
import { MoreVertical, Plus } from 'lucide-react'

type Props = {
  taskStatus: TaskStatus
  tasks: TasksWithRelations
}

export default function TaskKanbanColumn({ taskStatus, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
  })

  const { setOpen, setStatusId } = useCreateTaskDialog()

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex h-fit flex-col rounded-2xl',
        isOver ? 'bg-muted' : 'bg-muted/50',
      )}
    >
      <div className='flex min-w-64 items-center justify-between py-2 pl-3 pr-2'>
        <div className='flex items-center gap-2'>
          <DynamicIcon
            icon={taskStatus.icon}
            style={{ color: taskStatus.color }}
          />
          <p className='text-sm'>{taskStatus.name}</p>
          <p className='text-sm text-muted-foreground'>{tasks.length}</p>
        </div>
        <div className='flex items-center'>
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            className='hover:bg-foreground/10'
            onClick={() => {
              setOpen(true)
              setStatusId(taskStatus.id)
            }}
          >
            <Plus className='size-4 text-muted-foreground' />
          </Button>
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            className='hover:bg-foreground/10'
          >
            <MoreVertical className='size-4 text-muted-foreground' />
          </Button>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className='flex flex-col space-y-2 px-2 pb-2'>
          {tasks.map((task) => (
            <TaskKanbanItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
