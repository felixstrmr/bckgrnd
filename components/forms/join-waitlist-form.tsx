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

  const { execute, status } = useAction(joinWaitlistAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
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
            <FormItem className='flex h-32 flex-col items-start'>
              <div className='flex w-96 rounded-2xl border border-input bg-background p-1 pl-4 text-sm transition-all focus-within:border-muted-foreground focus-within:ring focus-within:ring-primary/25 hover:border-muted-foreground'>
                <FormControl className='w-full'>
                  <input
                    disabled={loading}
                    placeholder='Enter your email'
                    className='bg-transparent placeholder:text-muted-foreground focus:outline-none'
                    {...field}
                  />
                </FormControl>
                <Button loading={loading} size={'lg'}>
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
