import { getTaskStatuses } from '@/queries/task-status'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export async function getTaskStatusesWithCache(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return unstable_cache(
    async () => getTaskStatuses(supabase, domain),
    [`task-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`task-statuses-${domain}`],
    },
  )()
}
