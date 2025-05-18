import ProjectStatusIcon from '@/components/project-status-icon'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ProjectWithRelations } from '@/types'
import { ChevronLeft, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectsSidebar({ project }: Props) {
  return (
    <div className='flex w-80 max-w-80 min-w-80 flex-col border-r'>
      <div className='p-4'>
        <Link
          href={'/dashboard/projects'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ChevronLeft />
        </Link>
      </div>

      <Separator />
      <div className='flex flex-col gap-4 p-4'>
        <h1 className='text-xl font-semibold tracking-tight'>{project.name}</h1>
      </div>
      <Separator />
      <div className='flex flex-col gap-4 p-4'>
        <p className='text-xs'>Details</p>
        <div className='flex items-center gap-2'>
          <p className='text-muted-foreground w-16 text-xs'>Status</p>
          <div className='flex items-center gap-2'>
            <ProjectStatusIcon
              color={project.status.color}
              icon={project.status.icon}
            />
            <p className='text-sm'>{project.status.name}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-muted-foreground w-16 text-xs'>Client</p>
          <div className='flex items-center gap-2'>
            <User className='size-3.5' />
            <p className='text-sm'>{project.client.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
