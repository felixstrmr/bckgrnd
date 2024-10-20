import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getProjects(supabase: SupabaseClient<Database>, domain: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces(domain), status:project_statuses(*)')
    .eq('workspace.domain', domain)

  if (error) throw error

  return data
}
