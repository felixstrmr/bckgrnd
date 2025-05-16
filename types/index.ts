import { Database, Tables } from '@/types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type Client = Tables<'clients'>
export type Project = Tables<'projects'>
export type ProjectStatus = Tables<'project_statuses'>
export type Task = Tables<'tasks'>

type WU = Tables<'workspace_users'>

export type WorkspaceUser = WU & {
  workspace: Workspace
  user: User
}
