import {
  Client,
  ClientStatus,
  ClientUser,
  Project,
  ProjectStatus,
  Task,
  TaskComment,
  TaskImage,
  TaskPriority,
  User,
} from '@/types'

export type ClientWithRelations = Client & {
  workspace: {
    domain: string
  }
  status: ClientStatus
}

export type ClientUserWithRelations = ClientUser & {
  workspace: {
    domain: string
  }
  user: User
}

export type ProjectWithRelations = Project & {
  workspace: {
    domain: string
  }
  status: ProjectStatus
  client: Client
  tasks: {
    count: number
  }[]
}

export type TaskWithRelations = Task & {
  workspace: {
    domain: string
  }
  project: string
  priority: TaskPriority
  task_comments: {
    count: number
  }[]
  task_images: {
    count: number
  }[]
}

export type TaskCommentWithRelations = TaskComment & {
  image: TaskImage | null
  user: User
}
