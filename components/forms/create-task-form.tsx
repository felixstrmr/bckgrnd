'use client'

import { createTaskAction } from '@/actions/create-task-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { createTaskSchema } from '@/lib/schemas'
import { TaskPriority } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  domain: string
  projectId: string
  statusId: string
  workspaceId: string
  priorities: TaskPriority[]
  setOpen: (open: boolean) => void
}

export default function CreateTaskForm({
  domain,
  projectId,
  statusId,
  workspaceId,
  setOpen,
}: Props) {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      description: '',
      project: projectId,
      status: statusId,
      workspace: workspaceId,
      priority: 'f771f72c-bef1-48b8-a518-ffd078764e1e',
      domain,
    },
  })

  const { execute, status } = useAction(createTaskAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Creating task...')
    },
    onSuccess: () => {
      setOpen(false)
      toast.dismiss()
      toast.success('Task created successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    disabled={loading}
                    autoFocus
                    placeholder='Enter a task name'
                    className='w-full bg-transparent text-lg font-medium outline-none disabled:opacity-50'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    disabled={loading}
                    placeholder='Add a description (optional)'
                    className='w-full bg-transparent text-sm outline-none disabled:bg-transparent disabled:opacity-50'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button loading={loading}>Create</Button>
        </div>
      </form>
    </Form>
  )
}
