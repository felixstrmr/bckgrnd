'use client'

import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'
import { Sparkles } from 'lucide-react'
import React from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)

    const updateMatches = () => {
      setMatches(media.matches)
    }

    updateMatches()
    media.addEventListener('change', updateMatches)

    return () => {
      media.removeEventListener('change', updateMatches)
    }
  }, [query])

  return matches
}

export default function JoinWaitlistDialog() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { open, setOpen } = useJoinWaitlistModalStore()

  if (isDesktop)
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
          <div className='min-w-80 max-w-80'>
            <JoinWaitlistForm />
          </div>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
      <DrawerContent className='flex flex-col items-center px-9'>
        <DrawerHeader className='mt-9 flex w-full flex-col items-start px-0'>
          <DrawerTitle>Join Waitlist</DrawerTitle>
          <DrawerDescription>Get a chance for early access.</DrawerDescription>
        </DrawerHeader>
        <JoinWaitlistForm />
        <DrawerFooter className='mt-20 w-full px-0'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
