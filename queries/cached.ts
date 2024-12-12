import { getSession, getTaskStatuses, getWorkspace } from '@/queries'
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

export async function getWorkspaceWithCache(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return unstable_cache(
    async () => getWorkspace(supabase, domain),
    [`workspace-${domain}`],
    {
      revalidate: 3600,
      tags: [`workspace-${domain}`],
    },
  )()
}

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
