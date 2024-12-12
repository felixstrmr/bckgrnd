import ProjectGridItem from '@/components/views/projects/project-grid-item'
import { ProjectWithWorkspaceDomain } from '@/types/custom'

type Props = {
  projects: ProjectWithWorkspaceDomain[]
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
