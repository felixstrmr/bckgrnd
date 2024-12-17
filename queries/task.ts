import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTask(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, workspace:workspaces!inner(id, domain)')
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getTaskWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(domain), client:clients(*), project:projects(*), priority:task_priorities(*), status:task_statuses(*)',
    )
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type TaskWithRelations = Awaited<ReturnType<typeof getTaskWithRelations>>

export async function getTasks(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId?: string,
) {
  let query = supabase
    .from('tasks')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (projectId) {
    query = query.eq('project', projectId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}

export async function getTasksWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId?: string,
) {
  let query = supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(domain), client:clients(*), project:projects(*), priority:task_priorities(*), status:task_statuses(*)',
    )
    .eq('workspace.domain', domain)

  if (projectId) {
    query = query.eq('project', projectId)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export type TasksWithRelations = Awaited<
  ReturnType<typeof getTasksWithRelations>
>
