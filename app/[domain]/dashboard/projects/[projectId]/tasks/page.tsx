import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getTasks } from '@/queries'
import { getTaskStatusesWithCache } from '@/queries/cached'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [taskStatuses, tasks] = await Promise.all([
    getTaskStatusesWithCache(supabase, domain),
    getTasks(supabase, domain, projectId),
  ])

  return (
    <div className='flex size-full flex-col space-y-6 py-6'>
      <div className='flex items-center gap-2'>
        <h3>Tasks</h3>
        <div className='rounded-sm bg-muted px-2 text-sm shadow-sm'>
          {tasks.length}
        </div>
      </div>
      <TaskKanbanView taskStatuses={taskStatuses} tasks={tasks} />
    </div>
  )
}
