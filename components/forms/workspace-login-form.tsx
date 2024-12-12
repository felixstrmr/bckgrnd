'use client'

import { workspaceLoginAction } from '@/actions/workspace-login-action'
import Bckgrnd from '@/components/icons/bckgrnd'
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
import { workspaceLoginSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function WorkspaceLoginForm() {
  const router = useRouter()

  const [error, setError] = React.useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof workspaceLoginSchema>>({
    resolver: zodResolver(workspaceLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const toastId = 'workspace-login-form'

  const { execute, status } = useAction(workspaceLoginAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastId,
      })
      setError(error.serverError)
    },
    onExecute: () => {
      toast.loading('Logging in...', {
        id: toastId,
      })
      setError(undefined)
    },
    onSuccess: () => {
      toast.success('Successfully logged in!', {
        id: toastId,
      })
      router.push('/dashboard')
    },
  })
  const loading = status === 'executing'

  return (
    <div className='relative rounded-xl border bg-background p-9 shadow-lg'>
      <Bckgrnd className='mb-2' />
      <h4>Welcome back!</h4>
      <p className='mb-6 text-sm text-muted-foreground'>
        Please enter your details.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className='w-64 space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={error ? 'text-destructive' : ''}>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Enter your email'
                      autoFocus
                      className={error ? 'border-destructive' : ''}
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
                  <FormLabel className={error ? 'text-destructive' : ''}>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='••••••••••'
                      type='password'
                      className={error ? 'border-destructive' : ''}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={loading} className='w-full'>
            Log in
          </Button>
        </form>
      </Form>
    </div>
  )
}
