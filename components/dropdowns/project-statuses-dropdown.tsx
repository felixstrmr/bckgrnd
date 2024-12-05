'use client'

import { updateProjectAction } from '@/actions/update-project-action'
import DynamicIcon from '@/components/dynamic-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProjectStatus } from '@/types'
import { ProjectWithRelations } from '@/types/custom'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

type Props = {
  project: ProjectWithRelations
  projectStatuses: ProjectStatus[]
}

export default function ProjectStatusesDropdown({
  project,
  projectStatuses,
}: Props) {
  const { execute, status } = useAction(updateProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })
  const loading = status === 'executing'

  const handleChange = (statusId: string) => {
    if (project.status.id === statusId) return

    execute({ id: project.id, status: statusId })
  }

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
          <DropdownMenuItem
            key={status.id}
            onClick={() => handleChange(status.id)}
            disabled={loading}
          >
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
