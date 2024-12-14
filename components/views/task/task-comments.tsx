import { Task } from '@/types'

type Props = {
  task: Task
}

export default function TaskComments({ task }: Props) {
  return (
    <div className='h-full w-1/4 min-w-80 rounded-lg border'>{task.id}</div>
  )
}
