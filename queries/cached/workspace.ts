import { getWorkspace } from '@/queries/workspace'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

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
