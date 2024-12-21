import { Database } from '@/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTask(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(id, domain), status:task_statuses(id, name, color), project:projects(id, name)',
    )
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type Task = Awaited<ReturnType<typeof getTask>>

export async function getTaskName(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select('name, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type TaskName = Awaited<ReturnType<typeof getTaskName>>
