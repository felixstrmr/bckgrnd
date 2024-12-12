import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getSession(supabase: SupabaseClient<Database>) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getClients(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('clients')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getProjects(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, workspace:workspaces!inner(domain), client:clients(name)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}

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

export async function getTasks(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('project', projectId)

  if (error) {
    throw error
  }

  return data
}

export async function getTask(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(id, domain), project:projects(id, client)',
    )
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFiles(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
  version: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select(
      'workspace:workspaces!inner(domain), id, task, version, file:files(path, name)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .eq('id', version)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getLatestTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select(
      'workspace:workspaces!inner(domain), id, task, version, file:files(path, name)',
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
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('id, version')
    .eq('task', taskId)
    .order('version', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_statuses')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}
