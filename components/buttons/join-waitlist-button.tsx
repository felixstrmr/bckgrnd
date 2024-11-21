'use client'

import { Button } from '@/components/ui/button'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'

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
      className={className}
    >
      Join Waitlist
    </Button>
  )
}
