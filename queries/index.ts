import { Supabase } from '@/types'

export async function getWorkspaceUserQuery(
  supabase: Supabase,
  domain: string,
  user: string,
) {
  const { data } = await supabase
    .from('workspace_users')
    .select(
      `
          *,
          workspace:workspace!inner(*),
          user:users!inner(*)
        `,
    )
    .eq('workspace.domain', domain)
    .eq('user.id', user)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getClientsQuery(supabase: Supabase, domain: string) {
  const { data } = await supabase
    .from('clients')
    .select(
      `
          *,
          workspace:workspace!inner(domain)
        `,
    )
    .eq('workspace.domain', domain)
    .throwOnError()

  return data
}

export async function getProjectQuery(
  supabase: Supabase,
  domain: string,
  projectId: string,
) {
  const { data } = await supabase
    .from('projects')
    .select(
      `
          *,
          workspace:workspace!inner(domain)
        `,
    )
    .eq('workspace.domain', domain)
    .eq('id', projectId)
    .maybeSingle()
    .throwOnError()

  return data
}

export async function getProjectsQuery(supabase: Supabase, domain: string) {
  const { data } = await supabase
    .from('projects')
    .select(
      `
          *,
          workspace:workspace!inner(domain)
        `,
    )
    .eq('workspace.domain', domain)
    .throwOnError()

  return data
}

export async function getProjectStatusesQuery(
  supabase: Supabase,
  domain: string,
) {
  const { data } = await supabase
    .from('project_statuses')
    .select(
      `
          *,
          workspace:workspace!inner(domain)
        `,
    )
    .eq('workspace.domain', domain)
    .throwOnError()

  return data
}

export async function getTaskQuery(supabase: Supabase, taskId: string) {
  const { data } = await supabase
    .from('tasks')
    .select(
      `
        *
      `,
    )
    .eq('id', taskId)
    .maybeSingle()
    .throwOnError()

  return data
}
