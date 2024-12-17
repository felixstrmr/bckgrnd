import { getTaskPriorities } from '@/queries/task-priority'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

export async function getTaskPrioritiesWithCache(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return unstable_cache(
    async () => getTaskPriorities(supabase, domain),
    [`task-priorities-${domain}`],
    {
      revalidate: 3600,
      tags: [`task-priorities-${domain}`],
    },
  )()
}
