import {
  Client,
  ClientStatus,
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
}

export type TaskCommentWithRelations = TaskComment & {
  image: TaskImage | null
  user: User
}
