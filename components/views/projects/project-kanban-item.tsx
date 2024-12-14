'use client'

import { ProjectWithWorkspaceDomain } from '@/types/custom'
import { useDraggable } from '@dnd-kit/core'
import { CheckCircle, Circle, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  project: ProjectWithWorkspaceDomain
}

export default function ProjectKanbanItem({ project }: Props) {
  const router = useRouter()

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id,
    })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault()
      return
    }

    if ((e.target as HTMLElement).closest('[data-grip-handle]')) {
      e.preventDefault()
      return
    }

    router.push(`/dashboard/projects/${project.id}`)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onClick={handleClick}
      className='rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-md'
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
    </div>
  )
}
