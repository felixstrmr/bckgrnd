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
import { ProjectWithRelations } from '@/types/custom'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  project: ProjectWithRelations
}

export default function UpdateProjectForm({ project }: Props) {
  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: project.id,
      name: project.name,
      description: project.description ?? '',
    },
  })

  const { execute, status } = useAction(updateProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })
  const loading = status === 'executing'

  const debouncedSave = React.useMemo(
    () =>
      debounce(async () => {
        const formData = form.getValues()
        const hasChanges =
          formData.name !== project.name ||
          formData.description !== project.description

        if (hasChanges) {
          await execute(formData)
        }
      }, 1000),
    [execute, project, form],
  )

  React.useEffect(() => {
    return () => {
      debouncedSave.cancel()
    }
  }, [debouncedSave])

  const handleFieldChange = async () => {
    debouncedSave()
  }

  return (
    <Form {...form}>
      <div className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  id='project-name'
                  disabled={loading}
                  placeholder='Enter a project name'
                  className='w-full rounded-sm bg-transparent px-2 py-1 text-2xl font-medium outline-none disabled:cursor-not-allowed disabled:bg-transparent'
                  onChange={(e) => {
                    field.onChange(e)
                    handleFieldChange()
                  }}
                />
              </FormControl>
              <FormMessage role='alert' />
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
                  {...field}
                  id='project-description'
                  disabled={loading}
                  placeholder='Add a description (optional)'
                  className='w-full resize-none rounded-sm bg-transparent px-2 py-1 text-sm outline-none disabled:cursor-not-allowed disabled:bg-transparent'
                  onChange={(e) => {
                    field.onChange(e)
                    handleFieldChange()
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${target.scrollHeight}px`
                  }}
                  rows={1}
                />
              </FormControl>
              <FormMessage role='alert' />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
