'use client'

import { updateWorkspaceNameAction } from '@/actions/update-workspace-name-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateWorkspaceNameSchema } from '@/lib/schemas'
import { Workspace } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  workspace: Workspace
}

export default function UpdateWorkspaceNameForm({ workspace }: Props) {
  const form = useForm<z.infer<typeof updateWorkspaceNameSchema>>({
    resolver: zodResolver(updateWorkspaceNameSchema),
    defaultValues: {
      name: workspace.name,
      id: workspace.id,
      domain: workspace.domain,
    },
  })

  const { execute, status } = useAction(updateWorkspaceNameAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Workspace name updated successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8'>
        <div className='w-full max-w-4xl rounded-lg bg-muted px-2 pt-2'>
          <div className='flex flex-col rounded-md bg-background p-4 shadow-sm'>
            <h6>Workspace Name</h6>
            <p className='text-sm text-muted-foreground'>
              The name of your workspace.
            </p>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Enter a name'
                      className='mt-6 w-96'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between p-4'>
            <p className='text-sm text-muted-foreground'>
              Changes will take effect immediately.
            </p>
            <Button
              loading={loading}
              disabled={workspace.name === form.watch('name')}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
