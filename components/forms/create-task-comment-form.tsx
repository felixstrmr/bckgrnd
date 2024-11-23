'use client'

import { createTaskCommentAction } from '@/actions/create-task-comment-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createTaskCommentSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  taskId: string
  workspaceId: string
  selectedVersion: string | null
}

export default function CreateTaskCommentForm({
  taskId,
  workspaceId,
  selectedVersion,
}: Props) {
  const form = useForm<z.infer<typeof createTaskCommentSchema>>({
    resolver: zodResolver(createTaskCommentSchema),
    defaultValues: {
      message: '',
      task: taskId,
      workspace: workspaceId,
      version: selectedVersion ?? undefined,
    },
  })

  const { execute, status } = useAction(createTaskCommentAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      form.reset()
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder='Add a comment...'
                  rows={3}
                  className='w-full'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading} size={'sm'} className='mt-2'>
          Send
        </Button>
      </form>
    </Form>
  )
}
