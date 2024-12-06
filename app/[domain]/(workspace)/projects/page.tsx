import ProjectSearchCommand from '@/components/commands/project-search-command'
import ProjectFilterDropdown from '@/components/dropdowns/project-filter-dropdown'
import { buttonVariants } from '@/components/ui/button'
import ProjectGridView from '@/components/views/projects/project-grid-view'
import { getProjects } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const { data: projects, error } = await getProjects(supabase, domain)

  if (error) {
    throw error
  }

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <h3>Projects</h3>
          <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
            {projects.length}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <ProjectSearchCommand projects={projects} />
          <ProjectFilterDropdown />
          <Link
            href={`/projects/create`}
            className={buttonVariants({ variant: 'default' })}
          >
            <Plus />
            Create
          </Link>
        </div>
      </div>
      <ProjectGridView projects={projects} />
    </div>
  )
}
