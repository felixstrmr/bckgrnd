'use client'

import { Project } from '@/types'
import { useDraggable } from '@dnd-kit/core'
import Link from 'next/link'

type Props = {
  project: Project
}

export default function ProjectsKanbanItem({ project }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: project.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className='bg-background flex w-64 rounded-md border p-4 shadow-xs'
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {project.name}
    </Link>
  )
}
