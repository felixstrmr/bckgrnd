'use client'

import { updateProjectAction } from '@/actions/update-project-action'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { updateProjectSchema } from '@/lib/schemas'
import { Project } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  project: Project
}

export default function UpdateProjectForm({ project }: Props) {
  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      projectId: project.id,
      name: project.name,
      description: project.description ?? '',
    },
  })

  const { execute } = useAction(updateProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  placeholder='Enter a name'
                  className='w-full text-2xl font-semibold placeholder:text-muted-foreground/75 focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent'
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
                <textarea
                  placeholder='Add a description...'
                  className='w-full resize-none text-base outline-none'
                  rows={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
