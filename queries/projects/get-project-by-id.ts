import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getProjectById(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .eq('id', projectId)
    .single()

  if (error) throw error

  return data
}
