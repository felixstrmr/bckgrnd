import TaskKanbanColumn from '@/components/views/tasks/task-kanban-column'
import { TaskStatus } from '@/types'

import { Task } from '@/types'

type Props = {
  taskStatuses: TaskStatus[]
  tasks: Task[]
}

export default function TaskKanbanView({ taskStatuses, tasks }: Props) {
  const filterTasks = (taskStatusId: string) => {
    return tasks.filter((task) => task.status === taskStatusId)
  }

  return (
    <div className='flex gap-4'>
      {taskStatuses.map((taskStatus) => (
        <TaskKanbanColumn
          key={taskStatus.id}
          taskStatus={taskStatus}
          tasks={filterTasks(taskStatus.id)}
        />
      ))}
    </div>
  )
}
