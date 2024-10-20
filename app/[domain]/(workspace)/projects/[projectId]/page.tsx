import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { getProjectById } from '@/queries/projects/get-project-by-id'
import { formatDistanceToNowStrict } from 'date-fns'
import { Clock } from 'lucide-react'

type Props = {
  params: {
    domain: string
    projectId: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const project = await getProjectById(supabase, domain, params.projectId)

  return (
    <div className='flex size-full p-6'>
      <div className='space-y-1'>
        <h3>{project.name}</h3>
        <div className='flex items-center space-x-1 text-muted-foreground'>
          <Clock className='size-3' />
          <p className='text-xs'>
            {project.updated_at
              ? `Updated ${formatDistanceToNowStrict(new Date(project.updated_at), { addSuffix: true })}`
              : `Created ${formatDistanceToNowStrict(new Date(project.created_at), { addSuffix: true })}`}
          </p>
        </div>
      </div>
    </div>
  )
}
