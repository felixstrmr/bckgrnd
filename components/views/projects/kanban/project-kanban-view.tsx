'use client'

import { updateProjectAction } from '@/actions/update-project-action'
import ProjectKanbanColumn from '@/components/views/projects/kanban/project-kanban-column'
import { ProjectWithRelations } from '@/queries/project'
import { ProjectStatus } from '@/types'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useOptimisticAction } from 'next-safe-action/hooks'
import { useId } from 'react'

type Props = {
  projectStatuses: ProjectStatus[]
  projects: ProjectWithRelations[]
}

export default function ProjectKanbanView({
  projectStatuses,
  projects,
}: Props) {
  const filterProjects = (projectStatusId: string) => {
    return optimisticState.projects.filter(
      (project) => project.status.id === projectStatusId,
    )
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    }),
  )

  const { execute, optimisticState } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: { projects },
      // @ts-expect-error - TODO: fix this
      updateFn: (state, { projectId, statusId }) => {
        const newStatus = projectStatuses.find(
          (status) => status.id === statusId,
        )
        if (!newStatus) return state
        return {
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  status: newStatus,
                }
              : project,
          ),
        }
      },
    },
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeProject = optimisticState.projects.find(
      (project) => project.id === active.id,
    )
    const overStatus = over.id as string

    if (activeProject && activeProject.status !== overStatus) {
      execute({
        projectId: activeProject.id,
        statusId: overStatus,
      })
    }
  }

  const id = useId()

  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className='flex size-full gap-4 overflow-y-auto'>
        {projectStatuses.map((projectStatus) => (
          <ProjectKanbanColumn
            key={projectStatus.id}
            projectStatus={projectStatus}
            projects={filterProjects(projectStatus.id)}
          />
        ))}
      </div>
    </DndContext>
  )
}
