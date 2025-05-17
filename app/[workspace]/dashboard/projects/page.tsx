import ProjectsKanbanView from '@/components/projects-kanban-view'
import { buttonVariants } from '@/components/ui/button'
import { getDomain } from '@/lib/utils'
import { getProjects, getProjectStatuses } from '@/queries/cached'
import Link from 'next/link'

type Props = {
  params: Promise<{ workspace: string }>
}

export default async function Page({ params }: Props) {
  const { workspace } = await params
  const domain = getDomain(workspace)

  const [projects, projectStatuses] = await Promise.all([
    getProjects(domain),
    getProjectStatuses(domain),
  ])

  return (
    <div className='flex size-full flex-col overflow-hidden'>
      <div className='flex items-center justify-between border-b p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>Projects</h1>
        <Link
          href={'/dashboard/projects/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create project
        </Link>
      </div>
      <div className='size-full p-4'>
        <ProjectsKanbanView projects={projects} statuses={projectStatuses} />
      </div>
    </div>
  )
}
