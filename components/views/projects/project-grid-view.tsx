'use client'

import ProjectGridItem from '@/components/views/projects/project-grid-item'
import { ProjectWithRelations } from '@/types/custom'
import { parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'

type Props = {
  projects: ProjectWithRelations[]
}

export default function ProjectGridView({ projects }: Props) {
  const [statusFilter] = useQueryState(
    'status',
    parseAsString.withDefault('uncompleted'),
  )

  const filteredProjects = useMemo(() => {
    if (statusFilter === 'all') return projects
    return projects.filter((project) => project.status.type === statusFilter)
  }, [projects, statusFilter])

  return (
    <div className='flex gap-4'>
      {filteredProjects.length === 0 && (
        <div className='flex h-48 w-full items-center justify-center'>
          <p className='text-sm text-muted-foreground'>No projects found.</p>
        </div>
      )}
      {filteredProjects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </div>
  )
}
