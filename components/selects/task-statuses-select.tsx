'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import DynamicIcon from '@/components/dynamic-icon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TaskStatus } from '@/types'
import { useOptimisticAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

type Props = {
  taskId: string
  taskStatusId: string
  projectId: string
  taskStatuses: TaskStatus[]
  domain: string
}

export default function TaskStatusesSelect({
  taskId,
  taskStatusId,
  projectId,
  taskStatuses,
  domain,
}: Props) {
  const { execute, optimisticState } = useOptimisticAction(updateTaskAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    currentState: taskStatusId,
    updateFn: (state, input) => input.status,
  })

  return (
    <Select
      value={optimisticState}
      onValueChange={(value) =>
        execute({
          status: value,
          id: taskId,
          project: projectId,
          domain,
        })
      }
    >
      <SelectTrigger className='border-none shadow-none transition-all hover:bg-muted'>
        <SelectValue placeholder='Select a status' />
      </SelectTrigger>
      <SelectContent align='start'>
        {taskStatuses.map((taskStatus) => (
          <SelectItem key={taskStatus.id} value={taskStatus.id}>
            <DynamicIcon
              icon={taskStatus.icon}
              style={{ color: taskStatus.color }}
              className='mr-2 inline-flex'
            />
            {taskStatus.name}
            <div className='inline-flex size-2' />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
