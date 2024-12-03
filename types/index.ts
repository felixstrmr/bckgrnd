import { Tables } from '@/types/supabase'

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type WorkspaceUser = Tables<'workspace_users'>
export type Client = Tables<'clients'>
export type ClientStatus = Tables<'client_statuses'>
export type ClientUser = Tables<'client_users'>
export type Project = Tables<'projects'>
export type ProjectStatus = Tables<'project_statuses'>
export type Task = Tables<'tasks'>
export type TaskStatus = Tables<'task_statuses'>
export type TaskPriority = Tables<'task_priorities'>
export type TaskImage = Tables<'task_images'>
export type TaskComment = Tables<'task_comments'>
