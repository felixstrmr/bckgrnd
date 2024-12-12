import { Project } from '@/types'

export type ProjectWithWorkspaceDomain = Project & {
  workspace: {
    domain: string
  }
  client: {
    name: string
  }
}

export type TaskFileWithFile = {
  id: string
  workspace: { domain: string }
  task: string
  version: number
  file: { path: string; name: string } | null
}
