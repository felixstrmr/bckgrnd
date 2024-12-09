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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  workspace: Workspace
}

export default function UpdateWorkspaceNameForm({ workspace }: Props) {
  const router = useRouter()

  const form = useForm<z.infer<typeof updateWorkspaceNameSchema>>({
    resolver: zodResolver(updateWorkspaceNameSchema),
    defaultValues: {
      name: workspace.name,
      workspace: workspace.id,
    },
  })

  const { execute, status } = useAction(updateWorkspaceNameAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.dismiss()
      toast.loading('Updating workspace name...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Workspace name updated')
      router.refresh()
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className='w-full max-w-4xl rounded-lg border shadow-sm'
      >
        <div className='p-6'>
          <h5>Workspace Name</h5>
          <p className='text-xs text-muted-foreground'>
            Publicly visible name of your workspace.
          </p>
        </div>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='px-6'>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder='Enter a Workspace Name'
                  className='max-w-96'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-6 flex items-center justify-between rounded-b-lg border-t bg-muted px-6 py-4'>
          <p className='text-xs text-muted-foreground'>Max 64 characters.</p>
          <Button
            loading={loading}
            size={'sm'}
            disabled={form.watch('name') === workspace.name}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
