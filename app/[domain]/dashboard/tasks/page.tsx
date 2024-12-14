import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getClients, getTasks } from '@/queries'
import {
  getTaskPrioritiesWithCache,
  getTaskStatusesWithCache,
} from '@/queries/cached'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [tasks, taskStatuses, taskPriorities, clients] = await Promise.all([
    getTasks(supabase, domain),
    getTaskStatusesWithCache(supabase, domain),
    getTaskPrioritiesWithCache(supabase, domain),
    getClients(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
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
        clients={clients}
      />
    </div>
  )
}
