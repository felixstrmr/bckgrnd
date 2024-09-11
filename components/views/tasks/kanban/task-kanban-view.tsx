import TaskKanbanColumn from '@/components/views/tasks/kanban/task-kanban-column'
import { TaskStatus, TaskWithRelations } from '@/types'

type Props = {
  tasks: TaskWithRelations[]
  taskStatuses: TaskStatus[]
}

export default function TaskKanbanView({ tasks, taskStatuses }: Props) {
  const filteredTasks = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status.id)
  }

  return (
    <div className='flex size-full space-x-4 overflow-x-auto'>
      {taskStatuses.map((taskStatus) => (
        <TaskKanbanColumn
          key={taskStatus.id}
          taskStatus={taskStatus}
          tasks={filteredTasks(taskStatus)}
        />
      ))}
    </div>
  )
}
