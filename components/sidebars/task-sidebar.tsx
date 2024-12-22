'use client'

import UpdateTaskForm from '@/components/forms/update-task-form'
import TaskComments from '@/components/views/task/task-comments'
import TaskVersions from '@/components/views/task/task-versions'
import { cn } from '@/lib/utils'
import { parseAsStringEnum, useQueryState } from 'nuqs'

export type Task = {
  client: string | null
  created_at: string
  created_by: string | null
  description: string | null
  due_date: string | null
  id: string
  name: string
  project: {
    id: string
    name: string
  } | null
  status: {
    id: string
    name: string
    color: string
  }
  workspace: {
    id: string
    domain: string
  }
}

export type TaskStatus = {
  id: string
  name: string
  color: string
  workspace: {
    id: string
    domain: string
  }
}

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
