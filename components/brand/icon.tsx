import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  className?: string
  size?: number
}

export default function Icon({ className, size }: Props) {
  return (
    <Image
      src={'/brand/icon-light.svg'}
      alt='Bckgrnd Icon'
      width={size || 36}
      height={size || 36}
      className={cn('invert dark:invert-0', className)}
    />
  )
}
