import DynamicIcon from '@/components/dynamic-icon'
import { Separator } from '@/components/ui/separator'
import { TasksWithRelations } from '@/queries/task'
import { format } from 'date-fns'
import { Box, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  task: TasksWithRelations[number]
}

export default function TaskDetails({ task }: Props) {
  return (
    <div className='flex flex-col rounded-md'>
      <div className='p-4'>
        <p className='mb-4 text-xs'>Details</p>
        <h5>{task.name}</h5>
        {task.description && (
          <p className='text-sm text-muted-foreground'>{task.description}</p>
        )}
      </div>
      <Separator />
      <div className='space-y-2 p-4'>
        <p className='mb-2 text-xs'>Properties</p>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Status</p>
          <div className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'>
            <DynamicIcon
              icon={task.status.icon}
              style={{ color: task.status.color }}
              className='size-4'
            />
            <p className='text-sm capitalize'>{task.status.name}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Priority</p>
          <div className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'>
            <DynamicIcon
              icon={task.priority.icon}
              style={{ color: task.priority.color }}
              className='size-4'
            />
            <p className='text-sm capitalize'>{task.priority.name}</p>
          </div>
        </div>
        {task.project && (
          <div className='flex items-center'>
            <p className='w-28 text-sm text-muted-foreground'>Project</p>
            <Link
              href={`/dashboard/projects/${task.project.id}`}
              className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'
            >
              <Box className='size-4 text-muted-foreground' />
              <p className='text-sm'>{task.project.name}</p>
            </Link>
          </div>
        )}
        {task.client && (
          <div className='flex items-center'>
            <p className='w-28 text-sm text-muted-foreground'>Client</p>
            <Link
              href={`/dashboard/clients/${task.client.id}`}
              className='flex items-center gap-2 rounded-md p-1 px-2 transition-colors hover:bg-muted'
            >
              <User className='size-4' />
              <p className='text-sm'>{task.client.name}</p>
            </Link>
          </div>
        )}
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Due Date</p>
          <p className='rounded-md p-1 px-2 text-sm transition-colors hover:bg-muted'>
            {task.due_date ? format(new Date(task.due_date), 'PP') : 'N/A'}
          </p>
        </div>
        <div className='flex items-center'>
          <p className='w-28 text-sm text-muted-foreground'>Created</p>
          <p className='rounded-md p-1 px-2 text-sm transition-colors hover:bg-muted'>
            {format(new Date(task.created_at), 'PP')}
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
