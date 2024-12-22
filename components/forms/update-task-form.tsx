'use client'

import { updateTaskAction } from '@/actions/update-task-action'
import { Task, TaskStatus } from '@/components/sidebars/task-sidebar'
import TaskStatusIcon from '@/components/task-status-icon'
import { Calendar } from '@/components/ui/calendar'
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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { updateTaskSchema } from '@/schemas/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, isPast } from 'date-fns'
import { Box } from 'lucide-react'
import { useOptimisticAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  task: Task
  taskStatuses: TaskStatus[]
}

export default function UpdateTaskForm({ task, taskStatuses }: Props) {
  const [statusOpen, setStatusOpen] = React.useState(false)
  const [dueDateOpen, setDueDateOpen] = React.useState(false)

  const { execute, optimisticState } = useOptimisticAction(updateTaskAction, {
    currentState: { task },
    updateFn: (state, newTask) => {
      return {
        task: {
          ...newTask,
          ...state.task,
        },
      }
    },
  })

  const optimisticTask = optimisticState.task

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      taskId: task.id,
      name: optimisticTask.name,
      description: optimisticTask.description ?? undefined,
      status: optimisticTask.status.id,
      due_date: optimisticTask.due_date ?? undefined,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <div className='p-4'>
          <p className='text-xs'>Details</p>
        </div>
        <div className='space-y-2 px-4 pb-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex items-center'>
                <FormControl>
                  <input
                    placeholder='Enter a name'
                    className='w-full whitespace-nowrap text-xl font-semibold tracking-tight focus:outline-none'
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
              <FormItem className='flex items-center'>
                <FormControl>
                  <textarea
                    placeholder='Add a description'
                    className='h-fit min-h-fit w-full resize-none overflow-hidden text-muted-foreground focus:outline-none'
                    onInput={(e) => {
                      const target = e.currentTarget
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
        </div>
        <Separator />
        <div className='p-4'>
          <p className='text-xs'>Properties</p>
        </div>
        <div className='space-y-2 px-4 pb-4'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='flex items-center'>
                <p className='w-24 text-sm font-medium text-muted-foreground'>
                  Status
                </p>
                <Select
                  onValueChange={async (value) => {
                    field.onChange(value)
                    await form.handleSubmit(execute)()
                  }}
                  value={field.value}
                  open={statusOpen}
                  onOpenChange={setStatusOpen}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'h-7 w-fit border-none px-3 shadow-none transition-all hover:bg-muted',
                        statusOpen && 'bg-muted',
                      )}
                      hideChevron
                    >
                      <SelectValue placeholder='Select a status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    side='right'
                  >
                    {taskStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        <TaskStatusIcon
                          name={status.name}
                          color={status.color}
                          className='mr-2 inline-block size-3.5'
                        />
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {task.project && (
            <div className='flex items-center'>
              <p className='w-24 text-sm font-medium text-muted-foreground'>
                Project
              </p>
              <Link
                href={`/dashboard/projects/${task.project.id}`}
                className='flex h-7 items-center rounded-md px-3 text-sm transition-all hover:bg-muted'
              >
                <Box className='mr-2 size-3.5' />
                {task.project.name}
              </Link>
            </div>
          )}
          <FormField
            control={form.control}
            name='due_date'
            render={({ field }) => (
              <FormItem className='flex items-center'>
                <p className='w-24 text-sm font-medium text-muted-foreground transition-all'>
                  Due date
                </p>
                <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button
                        className={cn(
                          'h-7 rounded-md px-3 text-sm hover:bg-muted focus:outline-none',
                          !field.value && 'text-muted-foreground',
                          field.value &&
                            isPast(new Date(field.value)) &&
                            'text-destructive',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'
                    side='right'
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={async (date) => {
                        field.onChange(date?.toISOString())
                        setDueDateOpen(false)
                        await form.handleSubmit(execute)()
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center'>
            <p className='w-24 text-sm font-medium text-muted-foreground'>
              Created at
            </p>
            <p className='flex h-7 items-center px-3 text-sm'>
              {format(task.created_at, 'PP p')}
            </p>
          </div>
        </div>
        <Separator />
        <div className='p-4'>
          <p className='text-xs'>Assignees</p>
        </div>
      </form>
    </Form>
  )
}
