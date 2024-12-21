'use client'

import { workspaceLoginAction } from '@/actions/workspace-login-action'
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
import { workspaceLoginSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function WorkspaceLoginForm() {
  const router = useRouter()

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
    },
    onExecute: () => {
      toast.loading('Logging in...', {
        id: toastId,
      })
    },
    onSuccess: () => {
      router.push('/dashboard')
      toast.success('Logged in successfully!', {
        id: toastId,
      })
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-64 space-y-6'>
        <div className='space-y-4'>
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='password'
                    placeholder='••••••••••'
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
  )
}
