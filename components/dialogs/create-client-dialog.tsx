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
import { parseAsBoolean, useQueryState } from 'nuqs'

type Props = {
  workspaceId: string
}

export default function CreateClientDialog({ workspaceId }: Props) {
  const [open, setOpen] = useQueryState(
    'create',
    parseAsBoolean.withDefault(false),
  )

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
          <DialogTitle>Create new client</DialogTitle>
        </DialogHeader>
        <CreateClientForm workspaceId={workspaceId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
