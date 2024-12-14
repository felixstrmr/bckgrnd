import {
  File,
  Project,
  Task,
  TaskFile,
  TaskPriority,
  TaskStatus,
} from '@/types'

export type ProjectWithWorkspaceDomain = Project & {
  workspace: {
    domain: string
  }
  client: {
    name: string
  }
}

export type TaskStatusWithRelations = TaskStatus & {
  workspace: { id: string; domain: string }
}

export type TaskWithRelations = Task & {
  workspace: { domain: string }
  project: { id: string; name: string } | null
  client: { id: string; name: string } | null
  priority: TaskPriority
}

export type TaskFileWithRelations = TaskFile & {
  workspace: { domain: string }
  file: File
}
