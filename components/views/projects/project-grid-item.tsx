import { Project } from '@/types'
import Link from 'next/link'

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='w-64 min-w-64 overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md'
    >
      <div className='p-4'>
        <h6 className='truncate'>{project.name}</h6>
      </div>
      <div className='border-t bg-muted px-4 py-3'></div>
    </Link>
  )
}
