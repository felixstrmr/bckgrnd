import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectGridView from '@/components/views/projects/project-grid-view'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProjects } from '@/queries'
import { Grid2X2, List, Plus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const projects = await getProjects(supabase, domain)

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
          <Tabs defaultValue='grid'>
            <TabsList>
              <TabsTrigger value='grid'>
                <Grid2X2 className='size-4' />
              </TabsTrigger>
              <TabsTrigger value='list'>
                <List className='size-4' />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Link href={'/dashboard/projects/create'}>
            <Button>
              <Plus className='size-4' />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <ProjectGridView projects={projects} />
    </div>
  )
}
