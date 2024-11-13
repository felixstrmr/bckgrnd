import CreateClientForm from '@/components/forms/create-client-form'
import {
  getClientStatusesWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [workspace, clientStatuses] = await Promise.all([
    getWorkspaceWithCache(supabase, domain),
    getClientStatusesWithCache(supabase, domain),
  ])

  return (
    <div className='flex size-full pt-12'>
      <div className='mx-auto w-full max-w-xl'>
        <CreateClientForm
          domain={domain}
          clientStatuses={clientStatuses}
          workspaceId={workspace.id}
        />
      </div>
    </div>
  )
}
