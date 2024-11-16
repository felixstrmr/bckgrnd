import CreateProjectForm from '@/components/forms/create-project-form'
import { buttonVariants } from '@/components/ui/button'
import {
  getClientsWithCache,
  getProjectStatusesWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [workspace, clients, projectStatuses] = await Promise.all([
    getWorkspaceWithCache(supabase, domain),
    getClientsWithCache(supabase, domain),
    getProjectStatusesWithCache(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col space-y-12 p-6'>
      <div>
        <Link
          href={'/projects'}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ArrowLeft />
        </Link>
      </div>
      <div className='mx-auto w-full max-w-xl animate-in slide-in-from-bottom-3'>
        <CreateProjectForm
          domain={domain}
          workspaceId={workspace.id}
          clients={clients}
          projectStatuses={projectStatuses}
        />
      </div>
    </div>
  )
}
