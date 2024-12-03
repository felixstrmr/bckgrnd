import DynamicIcon from '@/components/dynamic-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProjectStatus } from '@/types'
import { ProjectWithRelations } from '@/types/custom'

type Props = {
  project: ProjectWithRelations
  projectStatuses: ProjectStatus[]
}

export default function ProjectStatusesDropdown({
  project,
  projectStatuses,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
          <DynamicIcon
            icon={project.status.icon}
            style={{ color: project.status.color }}
            className='size-3'
          />
          <p className='text-xs'>{project.status.name}</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {projectStatuses.map((status) => (
          <DropdownMenuItem key={status.id}>
            <DynamicIcon
              icon={status.icon}
              style={{ color: status.color }}
              className='size-3'
            />
            <p className='text-xs'>{status.name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
