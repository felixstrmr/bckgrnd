import { Tables } from '@/types/supabase'

export type User = Tables<'users'>
export type Workspace = Tables<'workspaces'>
export type WorkspaceUser = Tables<'workspace_users'>
export type Client = Tables<'clients'>
export type Project = Tables<'projects'>
export type ProjectStatus = Tables<'project_statuses'>
export type ProjectUser = Tables<'project_users'>
export type Task = Tables<'tasks'>
export type TaskStatus = Tables<'task_statuses'>
export type TaskPriority = Tables<'task_priorities'>
export type TaskImage = Tables<'task_images'>
export type TaskUser = Tables<'task_users'>

export type ProjectWithRelations = Project & {
  workspace: {
    domain: string
  }
  status: {
    name: string
    icon: string
    color: string
  }
  client: {
    name: string
  }
}

export type TaskWithRelations = Task & {
  workspace: {
    domain: string
  }
  priority: {
    name: string
    icon: string
    color: string
  }
}

export type TaskUserWithRelations = TaskUser & {
  user: User
}
