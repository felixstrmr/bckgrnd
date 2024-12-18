import DynamicIcon from '@/components/dynamic-icon'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatRelativeTime } from '@/lib/utils'
import { ProjectWithRelations } from '@/types/custom'
import { CheckCircle, ClipboardCheck, Clock, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: ProjectWithRelations
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className='w-64 min-w-64 overflow-hidden rounded-lg border shadow-sm transition-all hover:border-muted-foreground/25'
    >
      <div className='flex items-center gap-1 p-4 pb-0 text-muted-foreground'>
        <User className='size-3' />
        <p className='text-xs'>{project.client.name}</p>
      </div>
      <div className='flex items-center gap-2 p-4'>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <DynamicIcon
              icon={project.status.icon}
              style={{ color: project.status.color }}
              className='size-4'
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{project.status.name}</p>
          </TooltipContent>
        </Tooltip>
        <h6 className='truncate'>{project.name}</h6>
      </div>
      <div className='flex gap-2 border-t bg-muted px-4 py-3'>
        <div className='flex items-center gap-1 text-muted-foreground'>
          <ClipboardCheck className='size-3' />
          <p className='text-xs'>{project.tasks[0].count || 0}</p>
        </div>
        <div className='flex items-center gap-1 text-muted-foreground'>
          <CheckCircle className='size-3' />
          <p className='text-xs'>{project.completion}%</p>
        </div>
        <div className='ml-auto flex items-center gap-1 text-muted-foreground'>
          {project.end_date && (
            <>
              <Clock className='size-3' />
              <p className='text-xs'>
                {formatRelativeTime(new Date(project.end_date))}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
