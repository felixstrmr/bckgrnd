import ProjectGridItem from '@/components/views/projects/project-grid-item'
import { ProjectWithRelations } from '@/types/custom'

type Props = {
  projects: ProjectWithRelations[]
}

export default function ProjectGridView({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className='flex h-32 w-full items-center justify-center rounded-lg p-6'>
        No projects found
      </div>
    )
  }

  return (
    <div className='flex space-x-4'>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </div>
  )
}
