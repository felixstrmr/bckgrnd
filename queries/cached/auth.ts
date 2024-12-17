import { getSession, getUser, getUserDetails } from '@/queries/auth'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export async function getSessionWithCache(supabase: SupabaseClient) {
  const result = await unstable_cache(
    async () => getSession(supabase),
    [`session`],
    {
      revalidate: 3600,
      tags: [`session`],
    },
  )()

  return result
}

export async function getUserWithCache(supabase: SupabaseClient<Database>) {
  return unstable_cache(async () => getUser(supabase), [`user`], {
    revalidate: 3600,
    tags: [`user`],
  })()
}

export async function getUserDetailsWithCache(
  supabase: SupabaseClient<Database>,
) {
  return unstable_cache(
    async () => getUserDetails(supabase),
    [`user-details`],
    {
      revalidate: 3600,
      tags: [`user-details`],
    },
  )()
}
