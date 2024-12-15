'use client'

import { createTaskAction } from '@/actions/create-task-action'
import DynamicIcon from '@/components/dynamic-icon'
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
import { DialogClose } from '@/components/ui/dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTaskSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { Client, TaskPriority } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns/format'
import { ArrowRight, CalendarX2, Check, User } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  projectId?: string
  statusId: string
  workspaceId: string
  taskPriorities: TaskPriority[]
  clients: Client[] | null
  setOpen: (open: boolean) => void
}

export default function CreateTaskForm({
  projectId,
  statusId,
  workspaceId,
  setOpen,
  taskPriorities,
  clients,
}: Props) {
  const [dueDatePopoverOpen, setDueDatePopoverOpen] = React.useState(false)
  const [clientPopoverOpen, setClientPopoverOpen] = React.useState(false)

  const defaultTaskPriority = taskPriorities.find(
    (priority) => priority.is_default,
  )

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      description: '',
      workspaceId,
      projectId,
      statusId,
      priorityId: defaultTaskPriority?.id,
    },
  })

  const toastId = 'create-task-form'

  const { execute, status } = useAction(createTaskAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: toastId,
      })
    },
    onExecute: () => {
      toast.loading('Creating task...', {
        id: toastId,
      })
    },
    onSuccess: () => {
      toast.success('Task successfully created!', {
        id: toastId,
      })
      setOpen(false)
    },
  })
  const loading = status === 'executing'

  return (
    <Form {...form}>
      <div className='flex items-center gap-2 px-6 pt-3 text-muted-foreground'>
        <p className='text-xs'>New Task</p>
        <ArrowRight className='size-3' />
        <div className='rounded-full border border-dashed bg-background p-1 px-2 text-xs shadow'>
          {form.watch('name') || 'Untitled'}
        </div>
      </div>
      <form onSubmit={form.handleSubmit(execute)} className='px-6 pb-6'>
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
                    placeholder='Enter a task name'
                    className='w-full text-2xl placeholder:text-muted-foreground/75 focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent'
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
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-start gap-2'>
              {clients && (
                <FormField
                  control={form.control}
                  name='clientId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <Popover
                        open={clientPopoverOpen}
                        onOpenChange={setClientPopoverOpen}
                        modal={true}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              type='button'
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
              )}
              <FormField
                control={form.control}
                name='priorityId'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='shadow-sm'>
                          <SelectValue placeholder='Select a priority' />
                          <div className='w-2' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskPriorities
                          .sort((a, b) => b.position - a.position)
                          .map((priority) => (
                            <SelectItem key={priority.id} value={priority.id}>
                              <DynamicIcon
                                icon={priority.icon}
                                style={{ color: priority.color }}
                                className='mr-2 inline-block size-4'
                              />
                              {priority.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dueDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover
                      open={dueDatePopoverOpen}
                      onOpenChange={setDueDatePopoverOpen}
                      modal={true}
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
                            <CalendarX2 className='size-4 text-muted-foreground' />
                            {field.value ? (
                              format(field.value, 'PP')
                            ) : (
                              <span>Due date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={(date) => {
                            form.setValue('dueDate', date)
                            setDueDatePopoverOpen(false)
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
            <div className='flex items-center gap-2'>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button loading={loading}>Create</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
