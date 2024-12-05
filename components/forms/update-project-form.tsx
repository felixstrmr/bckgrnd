'use client'

import { updateProjectAction } from '@/actions/update-project-action'
import DynamicIcon from '@/components/dynamic-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { updateProjectSchema } from '@/lib/schemas'
import { ProjectStatus } from '@/types'
import { ProjectWithRelations } from '@/types/custom'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { debounce } from 'lodash'
import { CalendarMinus, CalendarPlus, Loader2, User } from 'lucide-react'
import { useOptimisticAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  project: ProjectWithRelations
  projectStatuses: ProjectStatus[]
}

export default function UpdateProjectForm({ project, projectStatuses }: Props) {
  const { execute, status, optimisticState } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: { project },
      updateFn: (state, formData) => ({
        project: {
          ...state.project,
          ...formData,
          status: formData.status
            ? projectStatuses.find((s) => s.id === formData.status) ||
              state.project.status
            : state.project.status,
        } as typeof state.project,
      }),
    },
  )
  const loading = status === 'executing'

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: optimisticState.project.id,
      name: optimisticState.project.name,
      description: optimisticState.project.description ?? '',
    },
  })

  const handleFormSubmit = useCallback(
    async (formData: z.infer<typeof updateProjectSchema>) => {
      if (formData.name === '') {
        toast.error('Project title cannot be empty')
        return
      }

      const hasChanges =
        formData.name !== optimisticState.project.name ||
        formData.description !== optimisticState.project.description

      if (hasChanges) {
        await execute(formData)
      }
    },
    [
      optimisticState.project.name,
      optimisticState.project.description,
      execute,
    ],
  )

  const debouncedSave = React.useMemo(
    () =>
      debounce(async () => {
        const formData = form.getValues()
        await handleFormSubmit(formData)
      }, 1000),
    [form, handleFormSubmit],
  )

  React.useEffect(() => {
    return () => debouncedSave.cancel()
  }, [debouncedSave])

  const handleStatusChange = (statusId: string) => {
    if (project.status.id === statusId) return
    execute({ id: optimisticState.project.id, status: statusId })
  }

  const startDate = project.start_date
    ? format(new Date(project.start_date), 'PP')
    : 'No date'

  const endDate = project.end_date
    ? format(new Date(project.end_date), 'PP')
    : 'No date'

  return (
    <Form {...form}>
      <div className='relative space-y-9'>
        <Loader2
          className={`absolute right-0 top-0 z-50 size-4 ${loading ? 'animate-spin' : 'hidden'}`}
        />
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <input
                    {...field}
                    id='project-name'
                    disabled={loading}
                    placeholder='Enter a project name'
                    className='w-full bg-transparent text-2xl font-medium outline-none disabled:cursor-not-allowed disabled:bg-transparent'
                    onChange={(e) => {
                      field.onChange(e)
                      debouncedSave()
                    }}
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
                    {...field}
                    id='project-description'
                    disabled={loading}
                    placeholder='Add a description (optional)'
                    className='w-full resize-none bg-transparent text-sm outline-none disabled:cursor-not-allowed disabled:bg-transparent'
                    onChange={(e) => {
                      field.onChange(e)
                      debouncedSave()
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = `${target.scrollHeight}px`
                    }}
                    rows={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-9 flex items-center space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
                <DynamicIcon
                  icon={optimisticState.project.status.icon}
                  style={{ color: optimisticState.project.status.color }}
                  className='size-3'
                />
                <p className='text-xs'>{optimisticState.project.status.name}</p>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {projectStatuses.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onClick={() => handleStatusChange(status.id)}
                  disabled={loading}
                >
                  <DynamicIcon
                    icon={status.icon}
                    style={{ color: status.color }}
                    className='size-3'
                  />
                  <p className='text-xs'>{status.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={`/clients/${project.client.id}`}
            className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'
          >
            <User className='size-3 text-muted-foreground' />
            <p className='text-xs'>{project.client.name}</p>
          </Link>
          <div className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
            <CalendarPlus className='size-3 text-muted-foreground' />
            <p className='text-xs'>{startDate}</p>
          </div>
          <div className='flex h-8 items-center space-x-2 rounded-md p-2 transition-all hover:bg-muted'>
            <CalendarMinus className='size-3 text-muted-foreground' />
            <p className='text-xs'>{endDate}</p>
          </div>
        </div>
      </div>
    </Form>
  )
}
