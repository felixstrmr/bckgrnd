'use client'

import TaskSidebarTabs from '@/components/tabs/task-sidebar-tabs'
import TaskComments from '@/components/views/task/task-comments'
import { TaskImage, User } from '@/types'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  domain: string
  taskId: string
  workspaceId: string
  taskImages: TaskImage[]
  user: User
}

export default function TaskSidebar({
  domain,
  taskId,
  workspaceId,
  taskImages,
  user,
}: Props) {
  const [tab] = useQueryState('tab', parseAsString.withDefault('comments'))

  return (
    <div className='flex h-full w-96 min-w-96 flex-col overflow-hidden rounded-lg border p-4'>
      <TaskSidebarTabs />
      {tab === 'comments' && (
        <TaskComments
          domain={domain}
          taskId={taskId}
          workspaceId={workspaceId}
          taskImages={taskImages}
          user={user}
        />
      )}
    </div>
  )
}
