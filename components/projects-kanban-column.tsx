'use client'

import ProjectStatusIcon from '@/components/project-status-icon'
import ProjectsKanbanItem from '@/components/projects-kanban-item'
import { Project, ProjectStatus } from '@/types'

type Props = {
  projects: Project[]
  status: ProjectStatus
}

export default function ProjectsKanbanColumn({ projects, status }: Props) {
  return (
    <div>
      <div className='bg-muted rounded-lg'>
        <div className='flex items-center gap-2 p-2'>
          <ProjectStatusIcon status={status} />
          <span className='text-sm'>{status.name}</span>
        </div>
        {projects.length > 0 ? (
          <div className='flex flex-col gap-1 p-1 pt-0'>
            {projects.map((project) => (
              <ProjectsKanbanItem key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className='w-64' />
        )}
      </div>
    </div>
  )
}
