import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

// combined

export async function getTasksData(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  try {
    const [tasks, taskStatuses] = await Promise.all([
      getTasks(supabase, domain),
      getTaskStatuses(supabase, domain),
    ])

    return {
      data: {
        tasks,
        taskStatuses,
      },
      error: null,
    }
  } catch (error) {
    console.error('getTasksData', error)
    return {
      data: null,
      error: error,
    }
  }
}

export async function getTaskDataVersions(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  try {
    const [task, taskFileVersions] = await Promise.all([
      getTask(supabase, domain, taskId),
      getTaskFileVersions(supabase, domain, taskId),
    ])

    return {
      data: {
        task,
        taskFileVersions,
      },
      error: null,
    }
  } catch (error) {
    console.error('getTaskData', error)
    return {
      data: null,
      error: error,
    }
  }
}

export async function getTaskDataStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  try {
    const [task, taskStatuses] = await Promise.all([
      getTask(supabase, domain, taskId),
      getTaskStatuses(supabase, domain),
    ])

    return {
      data: {
        task,
        taskStatuses,
      },
      error: null,
    }
  } catch (error) {
    console.error('getTaskData', error)
    return {
      data: null,
      error: error,
    }
  }
}

export async function getClientsData(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  try {
    const [clients, workspace] = await Promise.all([
      getClients(supabase, domain),
      getWorkspace(supabase, domain),
    ])

    return {
      data: {
        clients,
        workspace,
      },
      error: null,
    }
  } catch (error) {
    console.error('getClientsData', error)
    return {
      data: null,
      error: error,
    }
  }
}

// workspaces

export async function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

// clients

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

// tasks

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
    .maybeSingle()

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
      '*, workspace:workspaces!inner(id, domain), status:task_statuses(id, name, color), project:projects(id, name)',
    )
    .eq('workspace.domain', domain)

  if (error) {
    throw error
  }

  return data
}

// task statuses

export async function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_statuses')
    .select('id, name, color, workspace:workspaces!inner(id, domain)')
    .eq('workspace.domain', domain)
    .order('order', { ascending: true })

  if (error) {
    throw error
  }

  return data
}

// task files

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

// task commments

export async function getTaskComments(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_comments')
    .select(
      '*, workspace:workspaces!inner(domain), user:users(name, email, avatar)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  return data
}
