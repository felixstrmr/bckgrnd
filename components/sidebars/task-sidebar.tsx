import TaskSidebarTabs from '@/components/tabs/task-sidebar-tabs'
import TaskComments from '@/components/views/task/task-comments'
import TaskDetails from '@/components/views/task/task-details'
import TaskFileVersions from '@/components/views/task/task-file-versions'
import { Task } from '@/types'

type Props = {
  tab: string | undefined
  userId: string
  task: Task & {
    workspace: { id: string; domain: string }
    client: { id: string; name: string } | null
    project: { id: string; name: string } | null
    priority: { name: string; icon: string; color: string }
    status: { name: string; icon: string; color: string }
  }
}

export default function TaskSidebar({ tab, userId, task }: Props) {
  return (
    <div className='flex w-[22rem] min-w-[22rem] flex-col border-r'>
      <TaskSidebarTabs />

      {(tab === undefined || tab === 'details') && <TaskDetails task={task} />}
      {tab === 'comments' && <TaskComments userId={userId} task={task} />}
      {tab === 'versions' && (
        <TaskFileVersions taskId={task.id} domain={task.workspace.domain} />
      )}
    </div>
  )
}
