import ProjectViewTabs from '@/components/tabs/project-view-tabs'
import { Button } from '@/components/ui/button'
import ProjectKanbanView from '@/components/views/projects/project-kanban-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProjects } from '@/queries'
import { getProjectStatusesWithCache } from '@/queries/cached'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
  searchParams: Promise<{ view: string | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [projects, projectStatuses] = await Promise.all([
    getProjects(supabase, domain),
    getProjectStatusesWithCache(supabase, domain),
  ])

  const { view } = await searchParams

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-start justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h3>Projects</h3>
            <div className='rounded-sm bg-muted px-2 text-sm shadow-sm'>
              {projects.length}
            </div>
          </div>
          <p className='text-muted-foreground'>
            Create and manage your projects here.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <ProjectViewTabs />
          <Link href={'/dashboard/projects/create'}>
            <Button>
              <Plus className='size-4' />
              Create
            </Button>
          </Link>
        </div>
      </div>
      {view === 'list' ? (
        <></>
      ) : (
        <ProjectKanbanView
          projects={projects}
          projectStatuses={projectStatuses}
        />
      )}
    </div>
  )
}
