import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

// Workspace

export function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .single()
    .throwOnError()
}

// Client

export function getClients(supabase: SupabaseClient<Database>, domain: string) {
  return supabase
    .from('clients')
    .select('*, workspace:workspaces(domain), status:client_statuses(*)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Client Status

export function getClientStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('client_statuses')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Project

export function getProjects(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('projects')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .throwOnError()
}
