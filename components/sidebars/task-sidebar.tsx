'use client'

import TaskSidebarTabs from '@/components/tabs/task-sidebar-tabs'
import TaskComments from '@/components/views/task/task-comments'
import TaskImageHistory from '@/components/views/task/task-image-history'
import { User } from '@/types'
import { TaskImageWithRelations } from '@/types/custom'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  domain: string
  taskId: string
  workspaceId: string
  projectId: string
  taskImages: TaskImageWithRelations[]
  user: User
}

export default function TaskSidebar({
  domain,
  taskId,
  workspaceId,
  projectId,
  taskImages,
  user,
}: Props) {
  const [tab] = useQueryState('tab', parseAsString.withDefault('comments'))

  return (
    <div className='bg-mute4d flex h-full w-96 min-w-96 flex-col overflow-hidden rounded-lg border p-4'>
      <TaskSidebarTabs />
      {tab === 'comments' ? (
        <TaskComments
          domain={domain}
          projectId={projectId}
          taskId={taskId}
          workspaceId={workspaceId}
          taskImages={taskImages}
          user={user}
        />
      ) : (
        <TaskImageHistory taskImages={taskImages} />
      )}
    </div>
  )
}
