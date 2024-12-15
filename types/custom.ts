import {
  File,
  Project,
  Task,
  TaskComment,
  TaskFile,
  TaskPriority,
  TaskStatus,
  User,
} from '@/types'

export type ProjectWithWorkspaceDomain = Project & {
  workspace: {
    domain: string
  }
  client: {
    name: string
  }
  status: {
    id: string
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

export type TaskCommentWithRelations = TaskComment & {
  workspace: { domain: string }
  user: User
}
