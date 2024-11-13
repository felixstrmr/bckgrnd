import { SupabaseClient } from '@supabase/supabase-js'

// Client

export function getClients(supabase: SupabaseClient, domain: string) {
  return supabase
    .from('clients')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
}
