import TaskSidebar from '@/components/sidebars/task-sidebar'
import { createClient } from '@/lib/clients/supabase/server'
import { getTaskDataStatuses } from '@/lib/queries'
import { extractDomain } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = extractDomain(domainParam)

  const supabase = await createClient()
  const { data, error } = await getTaskDataStatuses(supabase, domain, taskId)

  if (error || !data || !data.taskStatuses) {
    return <div>Error loading task</div>
  }

  const { task, taskStatuses } = data

  if (!task) return notFound()

  return (
    <div className='min-w-80 max-w-80 border-r'>
      <TaskSidebar domain={domain} task={task} taskStatuses={taskStatuses} />
    </div>
  )
}
