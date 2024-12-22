'use client'

import UpdateTaskForm from '@/components/forms/update-task-form'
import TaskComments from '@/components/views/task/task-comments'
import TaskVersions from '@/components/views/task/task-versions'
import { cn } from '@/lib/utils'
import { Task, TaskStatus } from '@/types'
import { parseAsStringEnum, useQueryState } from 'nuqs'

type Props = {
  domain: string
  task: Task
  taskStatuses: TaskStatus[]
}

export default function TaskSidebar({ domain, task, taskStatuses }: Props) {
  const tabs = ['details', 'comments', 'versions']

  const [currentTab, setCurrentTab] = useQueryState(
    'tab',
    parseAsStringEnum(tabs).withDefault('details'),
  )

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center space-x-1 p-4'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={cn(
              'h-7 rounded-md px-3 text-xs capitalize transition-all',
              currentTab === tab
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {currentTab === 'details' && (
        <UpdateTaskForm task={task} taskStatuses={taskStatuses} />
      )}
      {currentTab === 'comments' && (
        <TaskComments
          domain={domain}
          taskId={task.id}
          workspaceId={task.workspace.id}
        />
      )}
      {currentTab === 'versions' && <TaskVersions />}
    </div>
  )
}
