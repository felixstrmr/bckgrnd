'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import TaskKanbanColumn from '@/components/views/tasks/task-kanban-column'
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

export type Task = {
  id: string
  name: string
  description: string | null
  due_date: string | null
  created_at: string
  created_by: string | null
  workspace: {
    id: string
    domain: string
  }
  status: {
    id: string
    name: string
    color: string
  }
  priority: {
    name: string
  } | null
  project: {
    id: string
    name: string
  } | null
  client: {
    id: string
    name: string
  } | null
  assignees: {
    user: {
      name: string | null
      email: string
      avatar: string | null
    }
  }[]
}

export type TaskStatus = {
  id: string
  name: string
  color: string
  workspace: {
    id: string
    domain: string
  }
}

type Props = {
  tasks: Task[]
  taskStatuses: TaskStatus[]
}

export default function TaskKanbanView({ tasks, taskStatuses }: Props) {
  const { execute, optimisticState } = useOptimisticAction(updateTaskAction, {
    currentState: { tasks },
    updateFn: (state, { taskId, status }) => {
      const targetStatus = taskStatuses.find((s) => s.id === status)
      if (!targetStatus) return state

      return {
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: targetStatus } : task,
        ),
      }
    },
  })

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
        status: overStatus,
      })
    }
  }

  const id = useId()

  return (
    <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='flex size-full gap-4 overflow-x-auto'>
        {taskStatuses.map((taskStatus) => (
          <TaskKanbanColumn
            key={taskStatus.id}
            taskStatus={taskStatus}
            tasks={filterTasks(taskStatus.id)}
          />
        ))}
      </div>
    </DndContext>
  )
}
