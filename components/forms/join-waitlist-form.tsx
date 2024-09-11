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
import { Input } from '@/components/ui/input'
import { joinWaitlistSchema } from '@/schemas/join-waitlist-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  className?: string
}

export default function JoinWaitlistForm({ className }: Props) {
  const form = useForm<z.infer<typeof joinWaitlistSchema>>({
    resolver: zodResolver(joinWaitlistSchema),
  })

  const { execute, status } = useAction(joinWaitlistAction, {
    onSuccess: () => {
      toast.success('You have been added to the waitlist!')
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className={className}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <div className='flex w-full min-w-96 justify-between rounded-lg border bg-background p-1 shadow-sm focus-within:ring-1 focus-within:ring-ring'>
                <FormControl>
                  <Input
                    placeholder='Enter your email'
                    disabled={loading}
                    className='w-full border-none shadow-none focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <Button loading={loading}>Join waitlist</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
