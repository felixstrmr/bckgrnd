import { getClients } from '@/lib/queries'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

// Client

export async function getClientsWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getClients(supabase, domain),
    [`clients-${domain}`],
    {
      revalidate: 3600,
      tags: [`clients-${domain}`],
    },
  )()

  if (error) throw error

  return data
}
