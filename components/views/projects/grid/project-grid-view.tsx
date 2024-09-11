import ProjectGridItem from '@/components/views/projects/grid/project-grid-item'
import { ProjectWithRelations } from '@/types'

type Props = {
  projects: ProjectWithRelations[]
}

export default function ProjectGridView({ projects }: Props) {
  return (
    <div className='flex space-x-4'>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </div>
  )
}
