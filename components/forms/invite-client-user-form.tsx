'use client'

import { inviteClientUserAction } from '@/actions/invite-client-user-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { inviteClientUserSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  domain: string
  clientId: string
  workspaceId: string
  inviterName: string
  clientName: string
  workspaceName: string
}

export default function InviteClientUserForm({
  domain,
  clientId,
  workspaceId,
  inviterName,
  clientName,
  workspaceName,
}: Props) {
  const form = useForm<z.infer<typeof inviteClientUserSchema>>({
    resolver: zodResolver(inviteClientUserSchema),
    defaultValues: {
      email: '',
      domain,
      inviterName,
      clientName,
      workspaceName,
      client: clientId,
      workspace: workspaceId,
    },
  })

  const { execute, status } = useAction(inviteClientUserAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Invitation email has been sent')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading}>Submit</Button>
      </form>
    </Form>
  )
}
