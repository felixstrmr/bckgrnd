import TasksEmptyState from '@/components/empty-states/tasks-empty-state'
import { Badge } from '@/components/ui/badge'
import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getTasksData } from '@/lib/queries'
import { extractDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = extractDomain(domain)

  const supabase = await createClient()
  const { data, error } = await getTasksData(supabase, domain)

  if (error || !data || !data.taskStatuses) {
    return <div>Error loading tasks</div>
  }

  const { tasks, taskStatuses } = data

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex w-full justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-semibold tracking-tight'>Tasks</h1>
            <Badge variant='secondary'>{tasks.length}</Badge>
          </div>
          <p className='text-muted-foreground'>Create and manage your tasks.</p>
        </div>
      </div>
      {tasks.length === 0 ? (
        <TasksEmptyState />
      ) : (
        <TaskKanbanView tasks={tasks} taskStatuses={taskStatuses} />
      )}
    </div>
  )
}
