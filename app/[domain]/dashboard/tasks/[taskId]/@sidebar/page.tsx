import TaskSidebar from '@/components/sidebars/task-sidebar'
import { createClient } from '@/lib/clients/supabase/server'
import { extractDomain } from '@/lib/utils'
import { getTask } from '@/queries/task'
import { getTaskStatuses } from '@/queries/task-statuses'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = extractDomain(domainParam)

  const supabase = await createClient()
  const [task, taskStatuses] = await Promise.all([
    getTask(supabase, domain, taskId),
    getTaskStatuses(supabase, domain),
  ])

  return (
    <div className='min-w-80 max-w-80 border-r'>
      <TaskSidebar domain={domain} task={task} taskStatuses={taskStatuses} />
    </div>
  )
}
