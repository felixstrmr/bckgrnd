import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getDefaultProjectStatus(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('project_statuses')
    .select('*, workspace:workspaces(id, domain)')
    .eq('workspace.domain', domain)
    .eq('is_default', true)
    .single()

  if (error) throw error

  return data
}
