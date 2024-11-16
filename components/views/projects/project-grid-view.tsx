import ProjectGridItem from '@/components/views/projects/project-grid-item'
import { Project } from '@/types'

type Props = {
  projects: Project[]
}

export default function ProjectGridView({ projects }: Props) {
  return (
    <div className='flex gap-4'>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </div>
  )
}
