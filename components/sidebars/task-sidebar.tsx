import TaskSidebarTabs from '@/components/tabs/task-sidebar-tabs'
import TaskComments from '@/components/views/task/task-comments'
import { Suspense } from 'react'

type Props = {
  domain: string
  taskId: string
}

export default function TaskSidebar({ domain, taskId }: Props) {
  return (
    <div className='flex w-96 min-w-96 flex-col justify-between rounded-lg border p-4'>
      <TaskSidebarTabs />
      <Suspense fallback={<div>Loading...</div>}>
        <TaskComments domain={domain} taskId={taskId} />
      </Suspense>
    </div>
  )
}
