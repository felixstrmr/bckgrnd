import CreatedVsDoneTasksChart from '@/components/charts/created-vs-done-tasks-chart'
import { getProjectWithCache, getTasksWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { formatRelativeTime, getDomain } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [project, tasks] = await Promise.all([
    getProjectWithCache(supabase, domain, projectId),
    getTasksWithCache(supabase, domain, projectId),
  ])

  if (!project) return notFound()

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center space-x-4'>
        <h3>{project.name}</h3>
        {project.updated_at ? (
          <p className='whitespace-nowrap text-sm text-muted-foreground'>
            Updated {formatRelativeTime(new Date(project.updated_at))}
          </p>
        ) : (
          <p className='whitespace-nowrap text-sm text-muted-foreground'>
            Created {formatRelativeTime(new Date(project.created_at))}
          </p>
        )}
      </div>
      <CreatedVsDoneTasksChart tasks={tasks} />
    </div>
  )
}
