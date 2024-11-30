import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

// User

export async function getUser(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return supabase
    .from('users')
    .select('*')
    .eq('id', [user.id])
    .single()
    .throwOnError()
}

// Workspace

export function getWorkspace(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('workspaces')
    .select('*')
    .eq('domain', domain)
    .single()
    .throwOnError()
}

export async function getDefaultWorkspace(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return supabase
    .from('workspaces')
    .select('*, workspace_users:workspace_users(user)')
    .in('workspace_users.user', [user.id])
    .single()
    .throwOnError()
}

// Client

export function getClients(supabase: SupabaseClient<Database>, domain: string) {
  return supabase
    .from('clients')
    .select('*, workspace:workspaces(domain), status:client_statuses(*)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Client Status

export function getClientStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('client_statuses')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Project

export function getProjects(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('projects')
    .select(
      `
      *,
      workspace:workspaces(domain),
      status:project_statuses(*),
      client:clients(*),
      tasks:tasks(count)
    `,
    )
    .eq('workspace.domain', domain)
    .throwOnError()
}

export function getProject(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  return supabase
    .from('projects')
    .select(
      '*, workspace:workspaces(domain), client:clients(id, name), status:project_statuses(name, icon, color)',
    )
    .eq('workspace.domain', domain)
    .eq('id', projectId)
    .single()
    .throwOnError()
}

// Project Status

export function getProjectStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('project_statuses')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Task

export function getTasks(
  supabase: SupabaseClient<Database>,
  domain: string,
  projectId: string,
) {
  return supabase
    .from('tasks')
    .select('*, workspace:workspaces(domain), priority:task_priorities(*)')
    .eq('workspace.domain', domain)
    .eq('project', projectId)
    .throwOnError()
}

export function getTask(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  return supabase
    .from('tasks')
    .select('*, workspace:workspaces(domain), project:projects(*)')
    .eq('workspace.domain', domain)
    .eq('id', taskId)
    .single()
    .throwOnError()
}

// Task Status

export function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('task_statuses')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Task Image

export function getTaskImages(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  return supabase
    .from('task_images')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('version', { ascending: false })
    .throwOnError()
}

// Task Comment

export function getTaskComments(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  return supabase
    .from('task_comments')
    .select(
      '*, workspace:workspaces(domain), user:users(*), image:task_images(*)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('created_at', { ascending: true })
    .throwOnError()
}
