import { getClientsWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()

  const clients = await getClientsWithCache(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <h3>Clients</h3>
      <pre>{JSON.stringify(clients, null, 2)}</pre>
    </div>
  )
}
