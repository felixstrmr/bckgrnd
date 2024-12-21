import { Database } from '@/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export type Client = Database['public']['Tables']['clients']['Row']

export async function getClients(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('clients')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return { data }
}
