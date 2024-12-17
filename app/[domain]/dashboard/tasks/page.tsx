import TaskKanbanView from '@/components/views/tasks/task-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getTaskPrioritiesWithCache } from '@/queries/cached/task-priority'
import { getTaskStatusesWithCache } from '@/queries/cached/task-status'
import { getWorkspaceWithCache } from '@/queries/cached/workspace'
import { getClients } from '@/queries/client'
import { getTasksWithRelations } from '@/queries/task'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [tasks, taskStatuses, taskPriorities, clients, workspace] =
    await Promise.all([
      getTasksWithRelations(supabase, domain),
      getTaskStatusesWithCache(supabase, domain),
      getTaskPrioritiesWithCache(supabase, domain),
      getClients(supabase, domain),
      getWorkspaceWithCache(supabase, domain),
    ])

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <h3>Tasks</h3>
          <div className='rounded-sm bg-muted px-2 text-sm shadow-sm'>
            {tasks.length}
          </div>
        </div>
        <p className='text-muted-foreground'>
          View all tasks and create single tasks here.
        </p>
      </div>
      <TaskKanbanView
        tasks={tasks}
        taskStatuses={taskStatuses}
        taskPriorities={taskPriorities}
        clients={clients}
        workspaceId={workspace.id}
      />
    </div>
  )
}
