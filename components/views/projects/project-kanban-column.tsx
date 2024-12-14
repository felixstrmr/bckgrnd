'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import ProjectKanbanItem from '@/components/views/projects/project-kanban-item'
import { cn } from '@/lib/utils'
import { ProjectStatus } from '@/types'
import { ProjectWithWorkspaceDomain } from '@/types/custom'
import { useDroppable } from '@dnd-kit/core'
import { MoreVertical, Plus } from 'lucide-react'

type Props = {
  projectStatus: ProjectStatus
  projects: ProjectWithWorkspaceDomain[]
}

export default function ProjectKanbanColumn({
  projectStatus,
  projects,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: projectStatus.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex h-fit min-w-64 flex-col rounded-2xl',
        isOver ? 'bg-foreground/10' : 'bg-muted',
      )}
    >
      <div className='flex min-w-64 items-center justify-between py-2 pl-3 pr-2'>
        <div className='flex items-center gap-2'>
          <DynamicIcon
            icon={projectStatus.icon}
            style={{ color: projectStatus.color }}
          />
          <p className='text-sm'>{projectStatus.name}</p>
          <p className='text-sm text-muted-foreground'>{projects.length}</p>
        </div>
        <div className='flex items-center'>
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            className='hover:bg-foreground/10'
          >
            <Plus className='size-4 text-muted-foreground' />
          </Button>
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            className='hover:bg-foreground/10'
          >
            <MoreVertical className='size-4 text-muted-foreground' />
          </Button>
        </div>
      </div>
      {projects.length > 0 && (
        <div className='flex flex-col space-y-2 px-2 pb-2'>
          {projects.map((project) => (
            <ProjectKanbanItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
