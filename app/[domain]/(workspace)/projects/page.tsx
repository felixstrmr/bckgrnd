import { Button, buttonVariants } from '@/components/ui/button'
import ProjectGridView from '@/components/views/projects/project-grid-view'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { getProjects } from '@/queries/projects/get-projects'
import { ArrowUpFromLine, PlusCircle } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    domain: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const projects = await getProjects(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <h3>Projects</h3>
          <p className='rounded-sm bg-muted px-2 py-0.5 text-sm'>{projects.length}</p>
        </div>
        <div className='flex space-x-2'>
          <Button variant={'outline'}>
            <ArrowUpFromLine className='size-4' />
            Export
          </Button>
          <Link href={'/projects/new'} className={buttonVariants({ variant: 'default' })}>
            <PlusCircle className='size-4' />
            New Project
          </Link>
        </div>
      </div>
      <ProjectGridView projects={projects} />
    </div>
  )
}
