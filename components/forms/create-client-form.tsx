'use client'

import { createClientAction } from '@/actions/create-client-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClientSchema } from '@/lib/schemas'
import { ClientStatus } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  domain: string
  clientStatuses: ClientStatus[]
  workspaceId: string
}

export default function CreateClientForm({
  workspaceId,
  domain,
  clientStatuses,
}: Props) {
  const router = useRouter()
  const defaultStatus = clientStatuses.find((status) => status.is_default)

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      domain,
      status: defaultStatus?.id,
      workspace: workspaceId,
    },
  })

  const { execute, status } = useAction(createClientAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      router.push('/clients')
      toast.success('Client created successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  autoFocus
                  placeholder='Enter a name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      <div
                        className='mr-2 inline-block size-2 rounded-full'
                        style={{ backgroundColor: status.color }}
                      />
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading}>Create</Button>
      </form>
    </Form>
  )
}
