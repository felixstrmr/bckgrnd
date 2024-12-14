'use client'

import { updateProjectAction } from '@/actions/update-project-action'
import ProjectKanbanColumn from '@/components/views/projects/project-kanban-column'
import { ProjectStatus } from '@/types'
import { ProjectWithWorkspaceDomain } from '@/types/custom'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useOptimisticAction } from 'next-safe-action/hooks'

type Props = {
  projectStatuses: ProjectStatus[]
  projects: ProjectWithWorkspaceDomain[]
}

export default function ProjectKanbanView({
  projectStatuses,
  projects,
}: Props) {
  const filterProjects = (projectStatusId: string) => {
    return optimisticState.projects.filter(
      (project) => project.status === projectStatusId,
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
      updateFn: (state, { projectId, statusId }) => {
        const newStatus = projectStatuses.find(
          (status) => status.id === statusId,
        )
        if (!newStatus) return state
        return {
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, status: newStatus.id }
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

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
