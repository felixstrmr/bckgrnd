import { Tables } from '@/types/supabase'

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type WorkspaceUser = Tables<'workspace_users'>
export type Client = Tables<'clients'>
export type Project = Tables<'projects'>
export type Task = Tables<'tasks'>
export type TaskStatus = Tables<'task_statuses'>
export type TaskFile = Tables<'task_files'>
export type File = Tables<'files'>
