'use client'

import { createProjectAction } from '@/actions/create-project-action'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { createProjectSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { Client, ProjectStatus } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowRight, CalendarIcon, Check, User } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DateRange } from 'react-day-picker'
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
  const router = useRouter()
  const [popoverOpen, setPopoverOpen] = React.useState(false)
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
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Creating project...')
    },
    onSuccess: ({ data }) => {
      router.push(`/dashboard/projects/${data?.id}`)
      toast.dismiss()
      toast.success('Project created successfully')
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-6'>
        <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
          <p>New Project</p>
          <ArrowRight className='size-4' />
          <p className='rounded-lg border border-dashed bg-background p-1 px-2 shadow-sm'>
            {form.watch('name') || 'Untitled'}
          </p>
        </div>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    disabled={loading}
                    autoFocus
                    placeholder='Enter a project name'
                    className='w-full bg-transparent text-2xl font-medium outline-none disabled:opacity-50'
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
                    disabled={loading}
                    placeholder='Add a description (optional)'
                    className='w-full resize-none bg-transparent text-sm outline-none disabled:bg-transparent disabled:opacity-50'
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = `${target.scrollHeight}px`
                    }}
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-start justify-between pt-12'>
          <div className='flex items-start gap-2'>
            <FormField
              control={form.control}
              name='client'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          size='sm'
                          className={cn(
                            'items-center justify-between px-2.5 font-normal active:scale-100',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <div className='flex items-center gap-1'>
                            <User className='size-3 text-muted-foreground/50' />
                            <p>
                              {field.value
                                ? clients.find(
                                    (client) => client.id === field.value,
                                  )?.name
                                : 'Client'}
                            </p>
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-48 p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search client...'
                          className='h-8 text-xs'
                        />
                        <CommandList>
                          <CommandEmpty className='flex items-center justify-center py-6 text-xs'>
                            No client found.
                          </CommandEmpty>
                          <CommandGroup>
                            {clients.map((client) => (
                              <CommandItem
                                className='text-xs'
                                value={client.name}
                                key={client.id}
                                onSelect={() => {
                                  form.setValue('client', client.id)
                                  setPopoverOpen(false)
                                }}
                              >
                                {client.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    client.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          size={'sm'}
                          className={cn(
                            'px-2.5 text-left font-normal active:scale-100',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className='size-4 text-muted-foreground/50' />
                          {field.value ? (
                            field.value.from && !field.value.to ? (
                              `${format(field.value.from, 'PP')}`
                            ) : field.value?.from && field.value?.to ? (
                              `${format(field.value.from, 'PP')} - ${format(
                                field.value.to,
                                'PP',
                              )}`
                            ) : (
                              <span>Start & end date</span>
                            )
                          ) : (
                            <span>Start & end date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='range'
                        selected={field.value as DateRange}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={loading}>Create</Button>
        </div>
      </form>
    </Form>
  )
}
