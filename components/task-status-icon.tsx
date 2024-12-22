import { cn } from '@/lib/utils'
import {
  Circle,
  CircleArrowDown,
  CircleArrowUp,
  CircleCheck,
  CircleDashed,
  CirclePlay,
} from 'lucide-react'

export const TASK_STATUS_ICONS = {
  Backlog: CircleDashed,
  Todo: Circle,
  'In Progress': CirclePlay,
  'In Review': CircleArrowUp,
  'Revisions Needed': CircleArrowDown,
  Done: CircleCheck,
} as const

type Props = {
  name: string
  color: string
  className?: string
}

export default function TaskStatusIcon({ name, color, className }: Props) {
  const IconComponent =
    TASK_STATUS_ICONS[name as keyof typeof TASK_STATUS_ICONS]
  return IconComponent ? (
    <IconComponent className={cn('size-4', className)} color={color} />
  ) : null
}
