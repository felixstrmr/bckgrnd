import { Task } from '@/types'

type Props = {
  task: Task
}

export default function UpdateTaskForm({ task }: Props) {
  return <h3 className='whitespace-nowrap'>{task.name}</h3>
}
