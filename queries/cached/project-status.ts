import { getProjectStatuses } from '@/queries/project-status'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export async function getProjectStatusesWithCache(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return unstable_cache(
    async () => getProjectStatuses(supabase, domain),
    [`project-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`project-statuses-${domain}`],
    },
  )()
}
