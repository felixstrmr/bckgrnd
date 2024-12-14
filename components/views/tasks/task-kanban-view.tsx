'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import CreateTaskDialog from '@/components/dialogs/create-task-dialog'
import TaskKanbanColumn from '@/components/views/tasks/task-kanban-column'
import { TaskPriority } from '@/types'
import { TaskStatusWithRelations, TaskWithRelations } from '@/types/custom'
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
  projectId: string
  taskStatuses: TaskStatusWithRelations[]
  tasks: TaskWithRelations[]
  taskPriorities: TaskPriority[]
}

export default function TaskKanbanView({
  projectId,
  taskStatuses,
  tasks,
  taskPriorities,
}: Props) {
  const filterTasks = (taskStatusId: string) => {
    return optimisticState.tasks.filter((task) => task.status === taskStatusId)
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
    updateFn: (state, { taskId, statusId }) => {
      const newStatus = taskStatuses.find((status) => status.id === statusId)
      if (!newStatus) return state
      return {
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus.id } : task,
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
        taskId: activeTask.id,
        statusId: overStatus,
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
        workspaceId={taskStatuses[0].workspace.id}
        taskPriorities={taskPriorities}
      />
    </DndContext>
  )
}
