'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

export default function TaskImageCreateDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new task image</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
