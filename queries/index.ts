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
