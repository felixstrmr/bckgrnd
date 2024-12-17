import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getTaskPrioritiesWithCache } from '@/queries/cached/task-priority'
import { getTaskStatusesWithCache } from '@/queries/cached/task-status'
import { getWorkspaceWithCache } from '@/queries/cached/workspace'
import { getTasksWithRelations } from '@/queries/task'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [taskStatuses, tasks, taskPriorities, workspace] = await Promise.all([
    getTaskStatusesWithCache(supabase, domain),
    getTasksWithRelations(supabase, domain, projectId),
    getTaskPrioritiesWithCache(supabase, domain),
    getWorkspaceWithCache(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col space-y-6 overflow-x-auto p-6'>
      <div className='flex items-center gap-2'>
        <h3>Tasks</h3>
        <div className='rounded-sm bg-muted px-2 text-sm shadow-sm'>
          {tasks.length}
        </div>
      </div>
      <TaskKanbanView
        tasks={tasks}
        taskStatuses={taskStatuses}
        taskPriorities={taskPriorities}
        workspaceId={workspace.id}
        projectId={projectId}
      />
    </div>
  )
}
