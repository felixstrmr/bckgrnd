import { getUserWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain, getGreeting } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam } = await params
  const domain = await getDomain(domainParam)

  const supabase = await createClient()
  const user = await getUserWithCache(supabase, domain)

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <h3>
        {getGreeting()}, {user.first_name}!
      </h3>
    </div>
  )
}
