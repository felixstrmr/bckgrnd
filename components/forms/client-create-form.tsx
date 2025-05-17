'use client'

import { clientCreateAction } from '@/actions/client-create-action'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { clientCreateSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  setOpen: (open: boolean) => void
}

export default function ClientCreateForm({ setOpen }: Props) {
  const form = useForm<z.infer<typeof clientCreateSchema>>({
    resolver: zodResolver(clientCreateSchema),
    defaultValues: {
      name: '',
      type: 'individual',
    },
  })

  const { execute, isExecuting } = useAction(clientCreateAction, {
    onExecute: () => {
      toast.loading('Creating client...', {
        id: 'client-create-form',
      })
    },
    onSuccess: () => {
      setOpen(false)
      toast.success('Client created successfully!', {
        id: 'client-create-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'client-create-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8'>
        <div className='space-y-4 px-4'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex w-full gap-2'
                  >
                    <FormItem className='flex w-full'>
                      <FormControl>
                        <label className='hover:bg-accent flex w-full cursor-pointer items-center gap-2 rounded-md border p-2'>
                          <RadioGroupItem value='individual' />
                          <span className='text-sm'>Individual</span>
                        </label>
                      </FormControl>
                    </FormItem>
                    <FormItem className='flex w-full'>
                      <FormControl>
                        <label className='hover:bg-accent flex w-full cursor-pointer items-center gap-2 rounded-md border p-2'>
                          <RadioGroupItem value='company' />
                          <span className='text-sm'>Company</span>
                        </label>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder={
                      form.watch('type') === 'individual'
                        ? 'John Doe'
                        : 'Acme Corporation'
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button isLoading={isExecuting}>Create</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
