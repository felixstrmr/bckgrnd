import CreateClientDialog from '@/components/dialogs/create-client-dialog'
import { Badge } from '@/components/ui/badge'
import { columns } from '@/components/views/clients/columns'
import { DataTable } from '@/components/views/clients/data-table'
import { createClient } from '@/lib/clients/supabase/server'
import { getClientsData } from '@/lib/queries'
import { extractDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = extractDomain(domain)

  const supabase = await createClient()
  const { data, error } = await getClientsData(supabase, domain)

  if (error || !data || !data.workspace) {
    return <div>Error loading clients</div>
  }

  const { clients, workspace } = data

  return (
    <div className='flex size-full flex-col'>
      <div className='flex w-full justify-between p-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-semibold tracking-tight'>Clients</h1>
            <Badge variant='secondary'>{clients.length}</Badge>
          </div>
          <p className='text-muted-foreground'>
            Manage your clients and associated users.
          </p>
        </div>
        <CreateClientDialog workspaceId={workspace.id} />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  )
}
