'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import TaskKanbanItem from '@/components/views/tasks/task-kanban-item'
import { TaskPriority, TaskStatus } from '@/types'
import { TaskWithRelations } from '@/types/custom'
import { useDroppable } from '@dnd-kit/core'
import { Loader2, MoreVertical } from 'lucide-react'
import dynamic from 'next/dynamic'

const CreatTaskDialog = dynamic(
  () => import('@/components/dialogs/create-task-dialog'),
  {
    loading: () => (
      <Button
        variant='ghost'
        className='size-7 min-w-7 rounded-sm'
        size='icon'
        disabled
      >
        <Loader2 className='size-4 animate-spin' />
      </Button>
    ),
  },
)

type Props = {
  tasks: TaskWithRelations[]
  taskStatus: TaskStatus
  workspaceId: string
  domain: string
  projectId: string
  priorities: TaskPriority[]
}

export default function TaskKanbanColumn({
  domain,
  projectId,
  tasks,
  taskStatus,
  workspaceId,
  priorities,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex h-fit flex-col space-y-2 rounded-xl p-2 transition-colors ${
        isOver ? 'bg-secondary' : 'bg-muted'
      }`}
    >
      <div className='flex w-64 min-w-64 items-center justify-between p-1'>
        <div className='flex items-center'>
          <div className='flex w-fit items-center gap-2'>
            <DynamicIcon
              icon={taskStatus.icon}
              style={{ color: taskStatus.color }}
            />
            <p className='text-sm'>{taskStatus.name}</p>
          </div>
          <p className='ml-2 text-sm text-muted-foreground'>{tasks.length}</p>
        </div>
        <div className='flex items-center gap-1'>
          <CreatTaskDialog
            domain={domain}
            projectId={projectId}
            statusId={taskStatus.id}
            workspaceId={workspaceId}
            priorities={priorities}
          />
          <Button
            variant='ghost'
            className='size-7 min-w-7 rounded-sm hover:bg-black/10'
            size='icon'
          >
            <MoreVertical className='size-4 text-muted-foreground' />
          </Button>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className='flex flex-col space-y-2'>
          {tasks.map((task) => (
            <TaskKanbanItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
