import {
  Client,
  ClientStatus,
  ClientUser,
  File,
  Project,
  ProjectStatus,
  Task,
  TaskComment,
  TaskImage,
  TaskPriority,
  TaskStatus,
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
  status: TaskStatus
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

export type TaskImageWithRelations = TaskImage & {
  workspace: {
    domain: string
  }
  image: File
}
