'use client'

import { Button } from '@/components/ui/button'
import { useWaitlistModalStore } from '@/store/use-waitlist-modal-store'

type Props = {
  size?: 'default' | 'sm' | 'lg'
}

export default function JoinWaitlistButton({ size }: Props) {
  const { setOpen } = useWaitlistModalStore()

  return (
    <Button onClick={() => setOpen(true)} size={size}>
      Join Waitlist
    </Button>
  )
}
