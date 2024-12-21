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
import { createClientSchema } from '@/schemas/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  workspaceId: string
  setOpen: (open: boolean) => void
}

export default function CreateClientForm({ workspaceId, setOpen }: Props) {
  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      workspaceId,
    },
  })

  const toastid = 'create-client-form'

  const { execute, status } = useAction(createClientAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastid,
      })
    },
    onExecute: () => {
      toast.loading('Creating client...', {
        id: toastid,
      })
    },
    onSuccess: () => {
      setOpen(false)
      toast.success('Client created successfully!', {
        id: toastid,
      })
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
          <Button loading={loading}>Create</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
