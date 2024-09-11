import DynamicIcon from '@/components/dynamic-icon'
import { ProjectWithRelations } from '@/types'
import { Clock, Files, MessageCircle, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='min-w-64 rounded-lg border transition-all hover:bg-muted'
    >
      <div className='flex items-center border-b p-4 py-3 text-muted-foreground'>
        <User className='mr-1 size-3' />
        <p className='text-xs'>{project.client.name}</p>
      </div>
      <div className='flex items-center space-x-2 p-4'>
        <DynamicIcon
          icon={project.status.icon}
          style={{ color: project.status.color }}
        />
        <h6>{project.name}</h6>
      </div>
      <div className='flex justify-between px-4 pb-3'>
        <div className='flex items-center text-muted-foreground'>
          <Clock className='mr-1 size-3' />
          <p className='text-xs'>0h</p>
        </div>
        <div className='flex space-x-3'>
          <div className='flex items-center text-muted-foreground'>
            <Files className='mr-1 size-3' />
            <p className='text-xs'>0</p>
          </div>
          <div className='flex items-center text-muted-foreground'>
            <MessageCircle className='mr-1 size-3' />
            <p className='text-xs'>0</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
