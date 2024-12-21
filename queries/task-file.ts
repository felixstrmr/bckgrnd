import { Database } from '@/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskFileId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select(
      '*, workspace:workspaces!inner(domain), file:files!inner(path, image_width, image_height)',
    )
    .eq('workspace.domain', domain)
    .eq('id', taskFileId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export type TaskFile = Awaited<ReturnType<typeof getTaskFile>>

export async function getLatestTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select(
      '*, workspace:workspaces!inner(domain), file:files!inner(path, image_width, image_height)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFileVersions(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('id, version, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('version', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export type TaskFileVersion = Awaited<ReturnType<typeof getTaskFileVersions>>
