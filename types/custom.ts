import {
  Client,
  ClientStatus,
  Project,
  ProjectStatus,
  Task,
  TaskPriority,
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
