import TaskKanbanView from '@/components/views/tasks/kanban/task-kanban-view'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: {
    domain: string
    projectId: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces(domain, id), project:projects(client, id), status:task_statuses(name, color, icon), priority:task_priorities(name, icon, color)',
    )
    .eq('workspace.domain', domain)
    .eq('project', params.projectId)

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  const { data: taskStatuses, error: taskStatusesError } = await supabase
    .from('task_statuses')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)

  if (taskStatusesError) {
    console.error(taskStatusesError)
    return <div>Error</div>
  }

  return (
    <div className='flex size-full flex-col space-y-6 overflow-x-hidden p-6'>
      <div className='flex items-center space-x-2'>
        <h3>Tasks</h3>
        <p className='text-muted-foreground'>{tasks.length}</p>
      </div>
      <TaskKanbanView tasks={tasks} taskStatuses={taskStatuses} />
    </div>
  )
}
