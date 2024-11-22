'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import TaskKanbanColumn from '@/components/views/tasks/task-kanban-column'
import { TaskStatus } from '@/types'
import { TaskWithRelations } from '@/types/custom'
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
  tasks: TaskWithRelations[]
  taskStatuses: TaskStatus[]
  workspaceId: string
  projectId: string
  domain: string
}

export default function TaskKanbanView({
  taskStatuses,
  tasks,
  domain,
  workspaceId,
  projectId,
}: Props) {
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

  const filterTasks = (taskStatus: TaskStatus) => {
    return optimisticState.tasks.filter((task) => task.status === taskStatus.id)
  }

  const { execute, optimisticState } = useOptimisticAction(updateTaskAction, {
    currentState: { tasks },
    updateFn(state, input) {
      return {
        tasks: state.tasks.map((task) =>
          task.id === input.id ? { ...task, status: input.status } : task,
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

    if (activeTask && activeTask.status !== overStatus) {
      execute({
        id: activeTask.id,
        status: overStatus,
        domain,
        project: activeTask.project,
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='flex size-full gap-4 overflow-y-auto'>
        {taskStatuses.map((taskStatus) => (
          <TaskKanbanColumn
            key={taskStatus.id}
            tasks={filterTasks(taskStatus)}
            taskStatus={taskStatus}
            workspaceId={workspaceId}
            domain={domain}
            projectId={projectId}
            priorities={[]}
          />
        ))}
      </div>
    </DndContext>
  )
}
