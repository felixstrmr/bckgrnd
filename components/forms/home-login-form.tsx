'use client'

import { homeLoginAction } from '@/actions/home-login-action'
import Icon from '@/components/brand/icon'
import Apple from '@/components/brand/icons/apple'
import Google from '@/components/brand/icons/google'
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
import { homeLoginSchema } from '@/schemas/home-login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function HomeLoginForm() {
  const [resetPassword, setResetPassword] = useQueryState(
    'resetPassword',
    parseAsBoolean.withDefault(false),
  )
  const router = useRouter()

  const form = useForm<z.infer<typeof homeLoginSchema>>({
    resolver: zodResolver(homeLoginSchema),
  })

  const { execute, status } = useAction(homeLoginAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      router.push('/dashboard')
      toast.success('Successfully logged in')
    },
  })
  const loading = status === 'executing'

  if (resetPassword) {
    return <div>reset</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-80 space-y-6'>
        <div>
          <Icon />
          <h4 className='mt-4'>Welcome back!</h4>
          <p className='text-sm text-muted-foreground'>
            Please log in to continue.
          </p>
        </div>
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
                <div className='flex justify-between'>
                  <FormLabel>Password</FormLabel>
                  <Suspense>
                    <button
                      type='button'
                      onClick={() => setResetPassword(true)}
                      className='text-sm hover:underline'
                    >
                      Forgot password?
                    </button>
                  </Suspense>
                </div>
                <FormControl>
                  <Input
                    disabled={loading}
                    type='password'
                    placeholder='•••••••••••••'
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
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='flex space-x-4'>
          <Button className='w-full' variant={'outline'}>
            <Apple className='mr-2 size-4' />
            Apple
          </Button>
          <Button className='w-full' variant={'outline'}>
            <Google className='mr-2 size-4' />
            Google
          </Button>
        </div>
        <div className='flex justify-center'>
          <div className='flex space-x-1 text-sm'>
            <p className='text-muted-foreground'>Don&apos;t have an account?</p>
            <Link href={'/signup'} className='hover:underline'>
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
