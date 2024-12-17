import { Database } from '@/types/supabase'
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'

export async function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_statuses')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}
