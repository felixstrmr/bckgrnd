'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'
import { ArrowRight } from 'lucide-react'

type Props = {
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline'
  className?: string
}

export default function JoinWaitlistButton({
  size,
  variant,
  className,
}: Props) {
  const { setOpen } = useJoinWaitlistModalStore()

  return (
    <Button
      onClick={() => setOpen(true)}
      size={size}
      variant={variant}
      className={cn('group', className)}
    >
      Join Waitlist
      <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
    </Button>
  )
}
