'use client'

import { projectUpdateAction } from '@/actions/project-update-action'
import ProjectsKanbanColumn from '@/components/projects-kanban-column'
import { Project, ProjectStatus } from '@/types'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useOptimisticAction } from 'next-safe-action/hooks'
import React from 'react'

type Props = {
  projects: Project[]
  statuses: ProjectStatus[]
}

export default function ProjectsKanbanView({ projects, statuses }: Props) {
  const { execute, optimisticState } = useOptimisticAction(
    projectUpdateAction,
    {
      currentState: projects,
      updateFn: (state, input) => {
        return state.map((project) => {
          if (project.id === input.id && input.status) {
            const newStatus = statuses.find((s) => s.id === input.status)
            if (newStatus) {
              return {
                ...project,
                status: newStatus,
              } as unknown as Project
            }
          }
          return project
        })
      },
    },
  )

  function filterProjects(status: ProjectStatus) {
    return optimisticState.filter((project) => project.status === status.id)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const projectId = active.id as string
    const statusId = over.id as string

    const project = optimisticState.find((project) => project.id === projectId)
    if (project?.status === statusId) return

    execute({
      id: projectId,
      status: statusId,
    })
  }

  const id = React.useId()

  return (
    <DndContext onDragEnd={handleDragEnd} id={id} sensors={sensors}>
      <div className='flex size-full gap-4 overflow-x-auto'>
        {statuses.map((status) => (
          <ProjectsKanbanColumn
            key={status.id}
            status={status}
            projects={filterProjects(status)}
          />
        ))}
      </div>
    </DndContext>
  )
}
