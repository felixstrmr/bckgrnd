import { Project, ProjectStatus } from '@/types'

export type ProjectWithRelations = Project & {
  workspace: {
    domain: string
  }
  status: ProjectStatus
}
