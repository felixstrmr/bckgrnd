'use client'

import { createClientAction } from '@/actions/create-client-action'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClientSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  setOpen: (open: boolean) => void
  domain: string
  workspaceId: string
}

export default function CreateClientForm({
  setOpen,
  domain,
  workspaceId,
}: Props) {
  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      domain,
      workspaceId,
    },
  })

  const toastId = 'create-client-form'

  const { execute, status } = useAction(createClientAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastId,
      })
    },
    onExecute: () => {
      toast.loading('Creating client...', {
        id: toastId,
      })
    },
    onSuccess: () => {
      toast.success('Client successfully created!', {
        id: toastId,
      })
      setOpen(false)
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-6'>
        <div className='space-y-4 px-6'>
          <FormField
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Enter a name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className='rounded-b-md border-t bg-muted px-6 py-4'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button loading={loading}>Create client</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
