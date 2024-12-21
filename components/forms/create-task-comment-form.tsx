'use client'

import { createTaskCommentAction } from '@/actions/create-task-comment'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createTaskCommentSchema } from '@/schemas/task-comment'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  taskId: string
  workspaceId: string
}

export default function CreateTaskCommentForm({ taskId, workspaceId }: Props) {
  const form = useForm<z.infer<typeof createTaskCommentSchema>>({
    resolver: zodResolver(createTaskCommentSchema),
    defaultValues: {
      message: '',
      taskId,
      workspaceId,
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
              <div className='relative'>
                <FormControl>
                  <Textarea
                    placeholder='Add a comment'
                    className='min-h-16 resize-none'
                    {...field}
                  />
                </FormControl>
                <Button
                  disabled={loading}
                  className='absolute bottom-2 right-2'
                  size={'icon'}
                >
                  {loading ? (
                    <Loader2 className='size-4 animate-spin' />
                  ) : (
                    <Send className='size-4' />
                  )}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
