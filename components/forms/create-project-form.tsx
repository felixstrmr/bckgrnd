'use client'

import { createProjectAction } from '@/actions/create-project-action'
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
import { Textarea } from '@/components/ui/textarea'
import { createProjectSchema } from '@/lib/schemas'
import { Client, ProjectStatus } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  domain: string
  workspaceId: string
  projectStatuses: ProjectStatus[]
  clients: Client[]
}

export default function CreateProjectForm({
  domain,
  workspaceId,
  clients,
  projectStatuses,
}: Props) {
  const defaultStatus = projectStatuses.find((status) => status.is_default)

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      client: '',
      status: defaultStatus?.id,
      workspace: workspaceId,
      domain,
    },
  })

  const { execute, status } = useAction(createProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Project created successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-6'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    autoFocus
                    placeholder='Enter a name'
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
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder='Add a description'
                    className='min-h-24'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <pre>{JSON.stringify(clients, null, 2)}</pre>
        <Button loading={loading}>Create</Button>
      </form>
    </Form>
  )
}
