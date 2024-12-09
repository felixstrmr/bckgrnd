import RevalidateTagButton from '@/components/buttons/revalidate-button'
import { columns } from '@/components/tables/clients/columns'
import { DataTable } from '@/components/tables/clients/data-table'
import { buttonVariants } from '@/components/ui/button'
import { getClientsWithCache } from '@/lib/queries/cached'
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
  const clients = await getClientsWithCache(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-9 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <h3>Clients</h3>
          <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
            {clients.length}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <RevalidateTagButton tag={`clients-${domain}`} />
          <Link
            href={`/dashboard/clients/create`}
            className={buttonVariants({ variant: 'default' })}
          >
            <Plus />
            Create
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  )
}
