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
import { Client } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  ArrowRight,
  CalendarArrowDown,
  CalendarArrowUp,
  Check,
  User,
} from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  workspaceId: string
  clients: Client[]
  statusId?: string
}

export default function CreateProjectForm({
  workspaceId,
  clients,
  statusId,
}: Props) {
  const router = useRouter()

  const [clientPopoverOpen, setClientPopoverOpen] = React.useState(false)
  const [startDatePopoverOpen, setStartDatePopoverOpen] = React.useState(false)
  const [endDatePopoverOpen, setEndDatePopoverOpen] = React.useState(false)

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      clientId: '',
      startDate: undefined,
      endDate: undefined,
      workspaceId,
      statusId,
    },
  })

  const toastId = 'create-project-form'

  const { execute, status } = useAction(createProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastId,
      })
    },
    onExecute: () => {
      toast.loading('Creating project...', {
        id: toastId,
      })
    },
    onSuccess: ({ data }) => {
      router.push(`/dashboard/projects/${data?.id}`)
      toast.success('Successfully created project!', {
        id: toastId,
      })
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <div className='flex items-center gap-2 text-muted-foreground'>
        <p className='text-xs'>New Project</p>
        <ArrowRight className='size-3' />
        <div className='rounded-full border border-dashed bg-background p-1 px-2 text-xs shadow'>
          {form.watch('name') || 'Untitled'}
        </div>
      </div>
      <form onSubmit={form.handleSubmit(execute)} className='mt-6'>
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
                    disabled={loading}
                    placeholder='Add a description (optional)'
                    className='w-full resize-none text-base placeholder:text-muted-foreground/75 focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent'
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = `${target.scrollHeight}px`
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-start gap-2'>
            <FormField
              control={form.control}
              name='clientId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover
                    open={clientPopoverOpen}
                    onOpenChange={setClientPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-start gap-1 p-2 shadow-sm',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <User className='size-4' />
                          {field.value
                            ? clients.find(
                                (client) => client.id === field.value,
                              )?.name
                            : 'Client'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-fit p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search client...'
                          className='h-8'
                        />
                        <CommandList>
                          <CommandEmpty>No client found.</CommandEmpty>
                          <CommandGroup>
                            {clients
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((client) => (
                                <CommandItem
                                  value={client.name}
                                  key={client.id}
                                  onSelect={() => {
                                    form.setValue('clientId', client.id)
                                    setClientPopoverOpen(false)
                                  }}
                                >
                                  {client.name}
                                  <Check
                                    className={cn(
                                      'ml-auto size-3',
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
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover
                    open={startDatePopoverOpen}
                    onOpenChange={setStartDatePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'justify-start p-2 shadow-sm',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarArrowUp className='size-4 text-muted-foreground' />
                          {field.value ? (
                            format(field.value, 'PP')
                          ) : (
                            <span>Start date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={(date) => {
                          form.setValue('startDate', date)
                          setStartDatePopoverOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover
                    open={endDatePopoverOpen}
                    onOpenChange={setEndDatePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'justify-start p-2 shadow-sm',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarArrowDown className='size-4 text-muted-foreground' />
                          {field.value ? (
                            format(field.value, 'PP')
                          ) : (
                            <span>End date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={(date) => {
                          form.setValue('endDate', date)
                          setEndDatePopoverOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <Button loading={loading}>Create</Button>
        </div>
      </form>
    </Form>
  )
}
