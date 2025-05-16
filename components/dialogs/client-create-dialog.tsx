'use client'

import ClientCreateForm from '@/components/forms/client-create-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

export default function ClientCreateDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new client</DialogTitle>
        </DialogHeader>
        <ClientCreateForm setOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
