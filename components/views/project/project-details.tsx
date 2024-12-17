import DynamicIcon from '@/components/dynamic-icon'
import { Separator } from '@/components/ui/separator'
import { ProjectWithRelations } from '@/queries/project'
import { format } from 'date-fns'
import { User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectDetails({ project }: Props) {
  return (
    <div className=''>
      <div className='p-4'>
        <p className='mb-4 text-xs'>Details</p>
        <h5>{project.name}</h5>
        <p className='text-muted-foreground'>Add a description...</p>
      </div>
      <Separator />
      <div className='space-y-2 p-4'>
        <p className='mb-2 text-xs'>Properties</p>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Status</p>
          <div className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'>
            <DynamicIcon
              icon={project.status.icon}
              style={{ color: project.status.color }}
              className='size-4'
            />
            <p className='text-sm capitalize'>{project.status.name}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Client</p>
          <Link
            href={`/dashboard/clients/${project.client.id}`}
            className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'
          >
            <User className='size-4' />
            <p className='text-sm'>{project.client.name}</p>
          </Link>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Start Date</p>
          <p className='rounded-md p-1 px-2 text-sm transition-colors hover:bg-muted'>
            {project.start_date
              ? format(new Date(project.start_date), 'PP')
              : 'N/A'}
          </p>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>End Date</p>
          <p className='rounded-md p-1 px-2 text-sm transition-colors hover:bg-muted'>
            {project.end_date
              ? format(new Date(project.end_date), 'PP')
              : 'N/A'}
          </p>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Created</p>
          <p className='rounded-md p-1 px-2 text-sm transition-colors hover:bg-muted'>
            {format(new Date(project.created_at), 'PP')}
          </p>
        </div>
      </div>
      <Separator />
      <div className='space-y-4 p-4'>
        <p className='text-xs'>Members</p>
      </div>
    </div>
  )
}
