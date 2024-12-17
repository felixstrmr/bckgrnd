import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getProject(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('id', projectId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type Project = Awaited<ReturnType<typeof getProject>>

export async function getProjectWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select(
      '*, workspace:workspaces!inner(domain), client:clients(*), status:project_statuses(*)',
    )
    .eq('workspace.domain', domain)
    .eq('id', projectId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type ProjectWithRelations = Awaited<
  ReturnType<typeof getProjectWithRelations>
>

export async function getProjects(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}

export async function getProjectsWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select(
      '*, workspace:workspaces!inner(domain), client:clients(*), status:project_statuses(*)',
    )
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}
