import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import React from 'react'

type IconName = keyof typeof LucideIcons

type Props = {
  icon: IconName | string
  className?: string
  style?: React.CSSProperties
}

type LucideIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

export default function DynamicIcon({ icon, className, style }: Props) {
  const IconComponent = React.useMemo(() => {
    if (typeof icon === 'string' && icon in LucideIcons) {
      return LucideIcons[icon as IconName] as LucideIconComponent
    }

    return LucideIcons.HelpCircle
  }, [icon])

  return <IconComponent className={cn('size-4 shrink-0', className)} style={style} />
}
