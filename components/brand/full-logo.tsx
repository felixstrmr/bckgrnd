import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  className?: string
}

export default function FullLogo({ className }: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src={'/brand/icon-light.svg'}
        alt='Bckgrnd Icon'
        width={36}
        height={36}
        className='invert dark:invert-0'
      />
      <Image
        src={'/brand/wordmark-light.svg'}
        alt='Bckgrnd Wordmark'
        width={0}
        height={36}
        className='mt-1 h-5 w-auto invert dark:invert-0'
      />
    </div>
  )
}
