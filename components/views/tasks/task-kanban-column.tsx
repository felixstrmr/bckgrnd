import DynamicIcon from '@/components/dynamic-icon'
import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { Task, TaskStatus } from '@/types'

type Props = {
  taskStatus: TaskStatus
  tasks: Task[]
}

export default function TaskKanbanColumn({ taskStatus, tasks }: Props) {
  return (
    <div className='flex h-fit min-w-64 flex-col rounded-2xl bg-muted'>
      <div className='flex items-center gap-2 p-3'>
        <DynamicIcon
          icon={taskStatus.icon}
          style={{ color: taskStatus.color }}
        />
        <p className='text-sm'>{taskStatus.name}</p>
      </div>
      {tasks.length > 0 && (
        <div className='flex flex-col px-1 pb-1'>
          {tasks.map((task) => (
            <TaskKanbanItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
