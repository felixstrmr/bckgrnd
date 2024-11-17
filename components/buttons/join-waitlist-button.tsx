'use client'

import { Button } from '@/components/ui/button'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'

type Props = {
  size?: 'default' | 'sm' | 'lg'
}

export default function JoinWaitlistButton({ size }: Props) {
  const { setOpen } = useJoinWaitlistModalStore()

  return (
    <Button onClick={() => setOpen(true)} size={size}>
      Join Waitlist
    </Button>
  )
}
