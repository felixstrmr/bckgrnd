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
import { Loader2, Send } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  taskId: string
  workspaceId: string
  fileId: string | undefined
}

export default function CreateTaskCommentForm({
  taskId,
  workspaceId,
  fileId,
}: Props) {
  const form = useForm<z.infer<typeof createTaskCommentSchema>>({
    resolver: zodResolver(createTaskCommentSchema),
    defaultValues: {
      message: '',
      taskId,
      workspaceId,
      fileId,
    },
  })

  const { execute, status } = useAction(createTaskCommentAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      form.setValue('message', '')
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
                    disabled={loading}
                    placeholder='Add a comment'
                    className='resize-none'
                    rows={3}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = `${target.scrollHeight}px`
                    }}
                    {...field}
                  />
                </FormControl>
                <Button
                  disabled={loading}
                  size={'icon'}
                  className='absolute bottom-2 right-2'
                >
                  {loading ? (
                    <Loader2 className='size-4 animate-spin' />
                  ) : (
                    <Send className='size-4' />
                  )}
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
