'use client'

import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'

import { Sparkles } from 'lucide-react'

export default function JoinWaitlistDialog() {
  const { open, setOpen } = useJoinWaitlistModalStore()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-fit'>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center justify-center'>
          <div className='mb-4 rounded-full bg-muted p-6'>
            <Sparkles className='size-9' />
          </div>
          <h4>Join Waitlist</h4>
          <p className='text-sm text-muted-foreground'>
            Get a chance for early access.
          </p>
        </div>
        <JoinWaitlistForm />
      </DialogContent>
    </Dialog>
  )
}
