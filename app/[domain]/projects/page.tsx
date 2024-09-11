import { buttonVariants } from '@/components/ui/button'
import ProjectGridView from '@/components/views/projects/grid/project-grid-view'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    domain: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const { data: projects, error } = await supabase
    .from('projects')
    .select(
      '*, workspace:workspaces(domain), status:project_statuses(name, icon, color), client:clients(name)',
    )
    .eq('workspace.domain', domain)

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <h3>Projects</h3>
          <p className='text-muted-foreground'>{projects.length}</p>
        </div>
        <Link
          href={'/projects/new'}
          className={buttonVariants({ variant: 'default' })}
        >
          <CirclePlus className='mr-2 size-4' />
          New project
        </Link>
      </div>
      <ProjectGridView projects={projects} />
    </div>
  )
}
