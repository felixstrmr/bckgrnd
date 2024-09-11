import DynamicIcon from '@/components/dynamic-icon'
import { reduceOpacity } from '@/lib/utils/reduce-opacity'
import { TaskWithRelations } from '@/types'
import { Clock, GripVertical } from 'lucide-react'
import Link from 'next/link'

type Props = {
  task: TaskWithRelations
}

export default function TaskKanbanItem({ task }: Props) {
  const bgColor = reduceOpacity(task.priority.color, 10)
  const borderColor = reduceOpacity(task.priority.color, 10)

  return (
    <Link
      href={`/tasks/${task.id}`}
      className='group flex min-w-64 flex-col rounded-md border bg-background shadow-sm hover:bg-background/75'
    >
      <div className='flex items-center space-x-2 border-b p-4 py-3'>
        <div
          className='flex w-fit items-center rounded-full border px-1 pr-1.5'
          style={{
            borderColor: borderColor,
            backgroundColor: bgColor,
            color: task.priority.color,
          }}
        >
          <DynamicIcon className='mr-1 size-3' icon={task.priority.icon} />
          <p className='truncate text-xs'>{task.priority.name}</p>
        </div>
        <div className='flex w-fit items-center rounded-full border px-1 pr-1.5 text-muted-foreground'>
          <Clock className='mr-1 size-3' />
          <p className='truncate text-xs'>{task.priority.name}</p>
        </div>
      </div>
      <div className='flex items-center p-4'>
        <GripVertical className='mr-2 size-4 text-muted-foreground' />
        <h6>{task.name}</h6>
      </div>
    </Link>
  )
}
