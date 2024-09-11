'use client'

import { addProjectAction } from '@/actions/add-project-action'
import { Button } from '@/components/ui/button'
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { addProjectSchema } from '@/schemas/add-project-schema'
import { Client } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  domain: string
  clients: Client[]
}

export default function AddProjectForm({ domain, clients }: Props) {
  const router = useRouter()

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      domain,
    },
  })

  const { execute, status } = useAction(addProjectAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: ({ data }) => {
      router.push(`/projects/${data?.id}`)
      toast.success('Project successfully created')
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
                    placeholder='Enter a project name'
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
                    placeholder='Enter a project description'
                    className='min-h-24'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Client</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-[32rem] justify-between px-3',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? clients.find((client) => client.id === field.value)
                              ?.name
                          : 'Select client'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[32rem] p-0'>
                    <Command>
                      <CommandInput
                        placeholder='Search client...'
                        className='h-9'
                      />
                      <CommandList>
                        <CommandEmpty>No client found.</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              value={client.id}
                              key={client.id}
                              onSelect={() => {
                                form.setValue('client', client.id)
                              }}
                            >
                              <PopoverClose className='flex size-full'>
                                {client.name}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    client.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </PopoverClose>
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
        </div>
        <div className='flex justify-end'>
          <Button loading={loading}>Save</Button>
        </div>
      </form>
    </Form>
  )
}
