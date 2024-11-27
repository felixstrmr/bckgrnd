'use client'

import { joinWaitlistAction } from '@/actions/join-waitlist-action'
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
import { joinWaitlistSchema } from '@/lib/schemas'
import { useJoinWaitlistModalStore } from '@/store/join-waitlist-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function JoinWaitlistForm() {
  const { setOpen } = useJoinWaitlistModalStore()

  const form = useForm<z.infer<typeof joinWaitlistSchema>>({
    resolver: zodResolver(joinWaitlistSchema),
    defaultValues: {
      email: '',
    },
  })

  const { execute, status } = useAction(joinWaitlistAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      setOpen(false)
      toast.success('You have been added to the waitlist')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  autoFocus
                  placeholder='Enter your email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading} className='w-full'>
          Join Waitlist
        </Button>
      </form>
    </Form>
  )
}
