import CreateClientDialog from '@/components/dialogs/create-client-dialog'
import { columns } from '@/components/views/clients/columns'
import { DataTable } from '@/components/views/clients/data-table'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getWorkspaceWithCache } from '@/queries/cached/workspace'
import { getClients } from '@/queries/client'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const [workspace, clients] = await Promise.all([
    getWorkspaceWithCache(supabase, domain),
    getClients(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col'>
      <div className='flex justify-between p-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h3>Clients</h3>
            <div className='rounded-sm bg-muted px-2 text-sm shadow-sm'>
              {clients.length}
            </div>
          </div>
          <p className='text-muted-foreground'>
            Create and invite users to clients here.
          </p>
        </div>
        <CreateClientDialog domain={domain} workspaceId={workspace.id} />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  )
}
