'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import CreateTaskDialog from '@/components/dialogs/create-task-dialog'
import TaskKanbanColumn from '@/components/views/tasks/task-kanban-column'
import { TasksWithRelations } from '@/queries/task'
import { Client, TaskPriority, TaskStatus } from '@/types'
import {
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
  tasks: TasksWithRelations
  workspaceId: string
  projectId?: string
  taskStatuses: TaskStatus[]
  taskPriorities: TaskPriority[]
  clients?: Client[]
}

export default function TaskKanbanView({
  workspaceId,
  projectId,
  taskStatuses,
  tasks,
  taskPriorities,
  clients,
}: Props) {
  const filterTasks = (taskStatusId: string) => {
    return optimisticState.tasks.filter(
      (task) => task.status.id === taskStatusId,
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

  const { execute, optimisticState } = useOptimisticAction(updateTaskAction, {
    currentState: { tasks },
    // @ts-expect-error - TODO: fix this
    updateFn: (state, { taskId, statusId }) => {
      const newStatus = taskStatuses.find((s) => s.id === statusId)
      if (!newStatus) return state
      return {
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      }
    },
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeTask = optimisticState.tasks.find(
      (task) => task.id === active.id,
    )
    const overStatus = over.id as string

    if (activeTask && activeTask.status.id !== overStatus) {
      execute({
        taskId: activeTask.id,
        statusId: overStatus,
      })
    }
  }

  const id = useId()

  return (
    <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='flex size-full gap-4 overflow-y-auto'>
        {taskStatuses.map((taskStatus) => (
          <TaskKanbanColumn
            key={taskStatus.id}
            taskStatus={taskStatus}
            tasks={filterTasks(taskStatus.id)}
          />
        ))}
      </div>
      <CreateTaskDialog
        projectId={projectId}
        workspaceId={workspaceId}
        taskPriorities={taskPriorities}
        clients={clients}
      />
    </DndContext>
  )
}
