import { Tables } from '@/types/supabase'

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type WorkspaceUser = Tables<'workspace_users'>
export type Client = Tables<'clients'>
export type ClientStatus = Tables<'client_statuses'>
export type Project = Tables<'projects'>
export type ProjectStatus = Tables<'project_statuses'>
