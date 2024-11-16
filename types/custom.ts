import { Client, ClientStatus, Project, Task, TaskPriority } from '@/types'

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
}

export type TaskWithRelations = Task & {
  workspace: {
    domain: string
  }
  project: string
  priority: TaskPriority
}
