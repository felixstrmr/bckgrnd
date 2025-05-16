'use client'

import { workspaceSigninAction } from '@/actions/workspace-signin-action'
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
import { workspaceSigninSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function WorkspaceSigninForm() {
  const form = useForm<z.infer<typeof workspaceSigninSchema>>({
    resolver: zodResolver(workspaceSigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { execute, isExecuting } = useAction(workspaceSigninAction, {
    onExecute: () => {
      toast.loading('Signing in...', {
        id: 'workspace-signin-form',
      })
    },
    onSuccess: () => {
      toast.success('Signed in successfully!', {
        id: 'workspace-signin-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'workspace-signin-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-64 space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder='email@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    type='password'
                    placeholder='••••••••••••'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full' isLoading={isExecuting}>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
