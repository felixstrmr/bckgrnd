import { ProjectWithWorkspaceDomain } from '@/types/custom'
import { CheckCircle, Circle, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: ProjectWithWorkspaceDomain
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className='min-w-64 rounded-lg border shadow-sm transition-all hover:shadow-md'
    >
      <div className='flex items-center gap-1 px-4 pb-2 pt-4 text-muted-foreground'>
        <User className='size-3' />
        <p className='text-sm'>{project.client.name}</p>
      </div>
      <div className='p-4 pt-0'>
        <h5 className='truncate'>{project.name}</h5>
      </div>
      <div className='flex items-center gap-3 rounded-b-lg border-t bg-muted px-4 py-2 text-sm text-muted-foreground'>
        <div className='flex items-center gap-1'>
          <CheckCircle className='size-3' />0
        </div>
        <div className='flex items-center gap-1'>
          <Circle className='size-3' />
          0%
        </div>
      </div>
    </Link>
  )
}
