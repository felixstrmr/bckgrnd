import { columns } from '@/components/tables/client-users/columns'
import { DataTable } from '@/components/tables/client-users/data-table'
import { getClientUsersWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string; clientId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, clientId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const clientUsers = await getClientUsersWithCache(supabase, domain, clientId)

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center space-x-2'>
        <h3>Users</h3>
        <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
          {clientUsers.length}
        </div>
      </div>
      <DataTable columns={columns} data={clientUsers} />
    </div>
  )
}
