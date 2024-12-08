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
import { Send } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  taskId: string
  workspaceId: string
  selectedVersion: string | null
  domain: string
  projectId: string
}

export default function CreateTaskCommentForm({
  taskId,
  workspaceId,
  selectedVersion,
  domain,
  projectId,
}: Props) {
  const form = useForm<z.infer<typeof createTaskCommentSchema>>({
    resolver: zodResolver(createTaskCommentSchema),
    defaultValues: {
      message: '',
      task: taskId,
      workspace: workspaceId,
      domain: domain,
      project: projectId,
      version: selectedVersion || undefined,
    },
  })

  useEffect(() => {
    if (selectedVersion !== form.getValues('version')) {
      form.setValue('version', selectedVersion || undefined, {
        shouldDirty: true,
      })
    }
  }, [selectedVersion, form])

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
      <form onSubmit={form.handleSubmit(execute)} className='relative w-full'>
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
                  className='max-h-32 min-h-20 w-full resize-none pr-20'
                  {...field}
                />
              </FormControl>
              <div className='absolute bottom-2 right-2 flex items-center justify-end gap-2 bg-background'>
                <p className='text-xs text-muted-foreground'>
                  {field.value.length} / 256
                </p>
                <Button
                  loading={loading}
                  disabled={!field.value}
                  size={'sm'}
                  className='size-8 p-0'
                >
                  {!loading && <Send className='size-4' />}
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
