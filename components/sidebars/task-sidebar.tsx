import TaskSidebarTabs from '@/components/tabs/task-sidebar-tabs'
import TaskComments from '@/components/views/task/task-comments'
import TaskDetails from '@/components/views/task/task-details'
import TaskFileVersions from '@/components/views/task/task-file-versions'
import { TasksWithRelations } from '@/queries/task'

type Props = {
  tab: string | undefined
  userId: string
  taskFileId: string | undefined
  task: TasksWithRelations[number]
  workspaceId: string
}

export default function TaskSidebar({
  tab,
  userId,
  task,
  taskFileId,
  workspaceId,
}: Props) {
  return (
    <div className='flex w-[22rem] min-w-[22rem] flex-col border-r'>
      <TaskSidebarTabs />

      {(tab === undefined || tab === 'details') && <TaskDetails task={task} />}
      {tab === 'comments' && (
        <TaskComments
          userId={userId}
          taskFileId={taskFileId}
          workspaceId={workspaceId}
          task={task}
          domain={task.workspace.domain}
        />
      )}
      {tab === 'versions' && (
        <TaskFileVersions taskId={task.id} domain={task.workspace.domain} />
      )}
    </div>
  )
}
