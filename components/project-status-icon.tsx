import { cn } from '@/lib/utils'
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CirclePause,
  CirclePlay,
  CircleX,
} from 'lucide-react'

type Props = {
  color: string
  icon: string
  className?: string
}

export default function ProjectStatusIcon({ color, icon, className }: Props) {
  const Icon = {
    CircleDashed: CircleDashed,
    CirclePlay: CirclePlay,
    CirclePause: CirclePause,
    CircleCheck: CircleCheck,
    CircleX: CircleX,
  }[icon]

  if (!Icon) return <Circle className={cn('size-4', className)} />

  return <Icon className={cn('size-4', className)} style={{ color: color }} />
}
