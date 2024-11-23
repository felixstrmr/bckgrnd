import ProjectGridItem from '@/components/views/projects/project-grid-item'
import { ProjectWithRelations } from '@/types/custom'

type Props = {
  projects: ProjectWithRelations[]
}

export default function ProjectGridView({ projects }: Props) {
  return (
    <div className='flex gap-4'>
      {projects.length === 0 && (
        <div className='flex h-48 w-full items-center justify-center'>
          <p className='text-sm text-muted-foreground'>
            No projects added yet.
          </p>
        </div>
      )}
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </div>
  )
}
