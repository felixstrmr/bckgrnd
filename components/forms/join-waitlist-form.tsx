'use client'

import { joinWaitlistAction } from '@/actions/join-waitlist-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { joinWaitlistSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function JoinWaitlistForm() {
  const form = useForm<z.infer<typeof joinWaitlistSchema>>({
    resolver: zodResolver(joinWaitlistSchema),
    defaultValues: {
      email: '',
    },
  })

  const toastId = 'join-waitlist-form'

  const { execute, status } = useAction(joinWaitlistAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastId,
      })
    },
    onExecute: () => {
      toast.loading('Adding you to the waitlist...', {
        id: toastId,
      })
    },
    onSuccess: () => {
      toast.success('You are now on the waitlist', {
        id: toastId,
      })
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
              <div className='w-fit rounded-xl border p-1 pl-3 shadow-lg transition-all focus-within:border-primary/50 focus-within:ring focus-within:ring-primary/15 hover:border-primary/50'>
                <FormControl>
                  <input
                    disabled={loading}
                    autoFocus
                    placeholder='Enter your email'
                    className='w-64 text-base focus:outline-none'
                    {...field}
                  />
                </FormControl>
                <Button size={'lg'} loading={loading}>
                  Join Waitlist
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
