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
import { useAction } from 'next-safe-action/hooks'
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
  const { execute } = useAction(updateTaskAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Updating task status...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Task status updated successfully')
    },
  })

  const taskStatus = taskStatuses.find((s) => s.id === taskStatusId)

  return (
    <Select
      value={taskStatus?.id}
      onValueChange={(value) =>
        execute({
          status: value,
          id: taskId,
          project: projectId,
          domain,
        })
      }
    >
      <SelectTrigger className='border-none transition-all hover:bg-muted'>
        <SelectValue placeholder='Select a status' />
      </SelectTrigger>
      <SelectContent>
        {taskStatuses.map((taskStatus) => (
          <SelectItem key={taskStatus.id} value={taskStatus.id}>
            <DynamicIcon
              icon={taskStatus.icon}
              style={{ color: taskStatus.color }}
              className='mr-2 inline-flex'
            />
            {taskStatus.name}
            <div className='inline-flex h-1 w-3' />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
