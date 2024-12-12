'use client'

import CreateClientForm from '@/components/forms/create-client-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {
  domain: string
  workspaceId: string
}

export default function CreateClientDialog({ domain, workspaceId }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='size-4' />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0'>
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle>Create a new client</DialogTitle>
        </DialogHeader>
        <CreateClientForm
          setOpen={setOpen}
          domain={domain}
          workspaceId={workspaceId}
        />
      </DialogContent>
    </Dialog>
  )
}
