import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import TaskKanbanItem from '@/components/views/tasks/kanban/task-kanban-item'
import { TaskStatus, TaskWithRelations } from '@/types'
import { CirclePlus } from 'lucide-react'

type Props = {
  taskStatus: TaskStatus
  tasks: TaskWithRelations[]
}

export default function TaskKanbanColumn({ taskStatus, tasks }: Props) {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex items-center space-x-2'>
        <DynamicIcon
          icon={taskStatus.icon}
          style={{ color: taskStatus.color }}
        />
        <p className='text-sm text-muted-foreground'>{taskStatus.name}</p>
        <p className='text-sm text-muted-foreground'>{tasks.length}</p>
      </div>
      <div className='space-y-2 rounded-xl bg-muted p-2'>
        {tasks.map((task) => (
          <TaskKanbanItem key={task.id} task={task} />
        ))}
        <Button className='min-w-64 justify-start' variant={'outline'}>
          <CirclePlus className='mr-2 size-4' />
          Add task
        </Button>
      </div>
    </div>
  )
}
