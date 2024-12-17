import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .single()

  if (error) {
    throw error
  }

  return data
}
