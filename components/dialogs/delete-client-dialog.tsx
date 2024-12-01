'use client'

import { deleteClientAction } from '@/actions/delete-client-action'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClientWithRelations } from '@/types/custom'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  client: ClientWithRelations
}

export default function DeleteClientDialog({ client }: Props) {
  const [name, setName] = React.useState('')

  const { execute, status } = useAction(deleteClientAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Client deleted successfully')
    },
  })
  const loading = status === 'executing'

  function handleSubmit() {
    if (name !== client.name) return
    execute({ domain: client.workspace.domain, id: client.id })
  }

  return (
    <DialogContent className='w-fit'>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
      </DialogHeader>
      <div className='flex w-80 items-center justify-center rounded-lg border border-red-600/25 bg-red-600/10 p-4'>
        <p className='text-center text-sm text-red-500'>
          This action cannot be undone. This will permanently delete the client.
        </p>
      </div>
      <div className='space-y-2'>
        <Label>Type {client.name} to confirm</Label>
        <Input
          className='w-80'
          placeholder={client.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
        />
      </div>
      <DialogFooter>
        <Button
          disabled={name !== client.name || loading}
          loading={loading}
          variant={'destructive'}
          onClick={handleSubmit}
          className='w-full'
        >
          Delete Client
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
