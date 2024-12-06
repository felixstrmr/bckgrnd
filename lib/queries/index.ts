import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

// Auth

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

export async function getSession(supabase: SupabaseClient<Database>) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
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
    .select('*, workspace_users:workspace_users!inner(user)')
    .in('workspace_users.user', [user.id])
    .eq('workspace_users.is_default', true)
    .single()
    .throwOnError()
}

// Client

export function getClients(supabase: SupabaseClient<Database>, domain: string) {
  return supabase
    .from('clients')
    .select('*, workspace:workspaces!inner(*), status:client_statuses(*)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

export function getClient(
  supabase: SupabaseClient<Database>,
  domain: string,
  clientId: string,
) {
  return supabase
    .from('clients')
    .select('*, workspace:workspaces!inner(*)')
    .eq('workspace.domain', domain)
    .eq('id', clientId)
    .single()
    .throwOnError()
}

// Client Status

export function getClientStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  return supabase
    .from('client_statuses')
    .select('*, workspace:workspaces!inner(*)')
    .eq('workspace.domain', domain)
    .throwOnError()
}

// Client User

export function getClientUsers(
  supabase: SupabaseClient<Database>,
  domain: string,
  clientId: string,
) {
  return supabase
    .from('client_users')
    .select('*, workspace:workspaces!inner(*), user:users(*)')
    .eq('workspace.domain', domain)
    .eq('client', clientId)
    .throwOnError()
}

// Client User Invitation

export function getClientUserInvitations(
  supabase: SupabaseClient<Database>,
  domain: string,
  clientId: string,
) {
  return supabase
    .from('client_user_invitations')
    .select('*, workspace:workspaces!inner(*)')
    .eq('workspace.domain', domain)
    .eq('client', clientId)
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
      workspace:workspaces!inner(*),
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
      `
      *,
      workspace:workspaces!inner(*),
      client:clients(id, name),
      status:project_statuses(name, icon, color)
    `,
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
    .select('*, workspace:workspaces!inner(*)')
    .eq('workspace.domain', domain)
    .order('position', { ascending: true })
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
    .select(
      '*, workspace:workspaces!inner(*), status:task_statuses(*), priority:task_priorities(*), task_comments:task_comments(count), task_images:task_images(count)',
    )
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
    .select('*, workspace:workspaces!inner(*), project:projects(*)')
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
    .select('*, workspace:workspaces!inner(*)')
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
    .select('*, workspace:workspaces!inner(*)')
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
      '*, workspace:workspaces!inner(*), user:users(*), image:task_images(*)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('created_at', { ascending: true })
    .throwOnError()
}
