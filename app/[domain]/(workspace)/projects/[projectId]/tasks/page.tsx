import RevalidateTagButton from '@/components/buttons/revalidate-button'
import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import {
  getTaskStatusesWithCache,
  getTasksWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [tasks, taskStatuses, workspace] = await Promise.all([
    getTasksWithCache(supabase, domain),
    getTaskStatusesWithCache(supabase, domain),
    getWorkspaceWithCache(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col space-y-6 overflow-y-auto p-6'>
      <div className='flex items-center justify-between'>
        <h3>Tasks</h3>
        <RevalidateTagButton tag={`tasks-${domain}`} />
      </div>
      <TaskKanbanView
        tasks={tasks}
        taskStatuses={taskStatuses}
        workspaceId={workspace.id}
        projectId={projectId}
        domain={domain}
      />
    </div>
  )
}
