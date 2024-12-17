import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskFileId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('id', taskFileId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFileWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskFileId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain), file:files(*)')
    .eq('workspace.domain', domain)
    .eq('id', taskFileId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export type TaskFileWithRelations = Awaited<
  ReturnType<typeof getTaskFileWithRelations>
>

export async function getTaskFiles(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId?: string,
) {
  let query = supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (taskId) {
    query = query.eq('task', taskId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFilesWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId?: string,
) {
  let query = supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain), file:files(*)')
    .eq('workspace.domain', domain)

  if (taskId) {
    query = query.eq('task', taskId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFileVersions(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId?: string,
  taskFileId?: string,
) {
  let query = supabase
    .from('task_files')
    .select('workspace:workspaces!inner(domain), id, version')
    .eq('workspace.domain', domain)

  if (taskId) {
    query = query.eq('task', taskId)
  }

  if (taskFileId) {
    query = query.eq('id', taskFileId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}
