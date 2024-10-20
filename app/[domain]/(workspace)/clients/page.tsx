import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { getClients } from '@/queries/clients/get-clients'

type Props = {
  params: {
    domain: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const clients = await getClients(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center space-x-2'>
        <h3>Clients</h3>
        <p className='rounded-sm bg-muted px-2 py-0.5 text-sm'>{clients.length}</p>
      </div>
    </div>
  )
}
