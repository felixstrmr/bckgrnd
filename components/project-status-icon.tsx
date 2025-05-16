import { cn } from '@/lib/utils'
import { ProjectStatus } from '@/types'
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CirclePause,
  CirclePlay,
  CircleX,
} from 'lucide-react'

type Props = {
  status: ProjectStatus
  className?: string
  style?: React.CSSProperties
}

export default function ProjectStatusIcon({ status, className, style }: Props) {
  const Icon = {
    CircleDashed: CircleDashed,
    CirclePlay: CirclePlay,
    CirclePause: CirclePause,
    CircleCheck: CircleCheck,
    CircleX: CircleX,
  }[status.icon]

  if (!Icon) return <Circle className={cn('size-4', className)} />

  return (
    <Icon
      className={cn('size-4', className)}
      style={{ color: status.color, ...style }}
    />
  )
}
