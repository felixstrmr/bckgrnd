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

export async function getProjectStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('project_statuses')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .order('position', { ascending: true })

  if (error) {
    throw error
  }

  return data
}

export async function getTasks(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(domain), priority:task_priorities(*), project:projects(id, name), client:clients(id, name)',
    )
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}

export async function getTasksByProject(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .select(
      '*, workspace:workspaces!inner(domain), priority:task_priorities(*), project:projects(id, name), client:clients(id, name)',
    )
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
    .maybeSingle()

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
    .select('*, workspace:workspaces!inner(domain), file:files(*)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)

  if (error) {
    throw error
  }

  return data
}

export async function getTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
  taskFileId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain), file:files(*)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .eq('id', taskFileId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getLastTaskFile(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_files')
    .select('*, workspace:workspaces!inner(domain), file:files(*)')
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

export async function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_statuses')
    .select('*, workspace:workspaces!inner(id, domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}

export async function getTaskPriorities(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_priorities')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}
