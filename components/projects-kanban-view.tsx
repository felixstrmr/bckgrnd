import ProjectsKanbanColumn from '@/components/projects-kanban-column'
import { Project, ProjectStatus } from '@/types'

type Props = {
  projects: Project[]
  statuses: ProjectStatus[]
}

export default function ProjectsKanbanView({ projects, statuses }: Props) {
  function getProjectsByStatus(status: ProjectStatus) {
    return projects.filter((project) => project.status === status.id)
  }

  return (
    <div className='flex size-full gap-4 overflow-x-auto'>
      {statuses.map((status) => (
        <ProjectsKanbanColumn
          key={status.id}
          status={status}
          projects={getProjectsByStatus(status)}
        />
      ))}
    </div>
  )
}
