import DynamicIcon from '@/components/dynamic-icon'
import { ProjectWithRelations } from '@/types/custom'
import Link from 'next/link'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='min-w-64 rounded-lg border p-3 shadow'
    >
      <div className='flex items-center space-x-2'>
        <DynamicIcon icon={project.status.icon} style={{ color: project.status.color }} />
        <h6>{project.name}</h6>
      </div>
    </Link>
  )
}
