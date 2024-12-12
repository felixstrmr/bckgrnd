import { Task } from '@/types'
import { CheckCircle, Circle } from 'lucide-react'
import Link from 'next/link'

type Props = {
  task: Task
}

export default function TaskKanbanItem({ task }: Props) {
  return (
    <Link
      href={`/dashboard/tasks/${task.id}`}
      className='flex flex-col rounded-lg border bg-background shadow-sm transition-all hover:shadow-md'
    >
      <div className='p-4'>
        <h5 className='truncate'>{task.name}</h5>
      </div>
      <div className='flex items-center gap-3 rounded-b-lg border-t bg-muted px-4 py-2 text-sm text-muted-foreground'>
        <div className='flex items-center gap-1'>
          <CheckCircle className='size-3' />0
        </div>
        <div className='flex items-center gap-1'>
          <Circle className='size-3' />
          0%
        </div>
      </div>
    </Link>
  )
}
