import { Button, buttonVariants } from '@/components/ui/button'
import { columns } from '@/components/views/projects/table/columns'
import { DataTable } from '@/components/views/projects/table/data-table'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProjects } from '@/queries'
import { getProjectStatusesWithCache } from '@/queries/cached'
import { Box, Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ProjectKanbanView = dynamic(
  () => import('@/components/views/projects/kanban/project-kanban-view'),
  {
    loading: () => <div>Loading...</div>,
  },
)

const ProjectViewTabs = dynamic(
  () => import('@/components/tabs/project-view-tabs'),
)

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
    <div className='flex size-full flex-col'>
      <div className='flex items-start justify-between p-6'>
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
      {projects.length > 0 ? (
        view === 'kanban' ? (
          <div className='size-full px-6 pb-6'>
            <ProjectKanbanView
              projects={projects}
              projectStatuses={projectStatuses}
            />
          </div>
        ) : (
          <DataTable columns={columns} data={projects} />
        )
      ) : (
        <div className='flex size-full h-64 flex-col items-center justify-center'>
          <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
            <Box className='size-8 text-muted-foreground' />
          </div>
          <div className='mb-4 mt-2 text-center'>
            <h5>No projects found.</h5>
            <p className='text-muted-foreground'>
              Create your first project to get started.
            </p>
          </div>
          <Link
            href={'/dashboard/projects/create'}
            className={buttonVariants({ variant: 'outline' })}
          >
            <Plus className='size-4' />
            Create
          </Link>
        </div>
      )}
    </div>
  )
}
