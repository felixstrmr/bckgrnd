import PriorityHigh from '@/components/icons/solid/priority-high'
import PriorityLow from '@/components/icons/solid/priority-low'
import PriorityMedium from '@/components/icons/solid/priority-medium'
import { cn } from '@/lib/utils'

export const TASK_PRIORITY_ICONS = {
  Low: PriorityLow,
  Medium: PriorityMedium,
  High: PriorityHigh,
} as const

type Props = {
  name: string
  className?: string
}

export default function TaskPriorityIcon({ name, className }: Props) {
  const IconComponent =
    TASK_PRIORITY_ICONS[name as keyof typeof TASK_PRIORITY_ICONS]
  return IconComponent ? (
    <IconComponent className={cn('size-4', className)} />
  ) : null
}
