'use client'

import DynamicIcon from '@/components/dynamic-icon'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { ProjectWithRelations } from '@/types/custom'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Search, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  projects: ProjectWithRelations[]
}

export default function ProjectSearchCommand({ projects }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'ghost'} size={'icon'}>
        <Search className='size-4' />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <CommandInput placeholder='Search projects...' />
        <CommandList>
          <CommandEmpty>No projects found.</CommandEmpty>
          <CommandGroup heading='Projects' className='pb-2'>
            {projects.map((project) => (
              <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
                <CommandItem className='flex items-center gap-2'>
                  <DynamicIcon
                    icon={project.status.icon}
                    style={{ color: project.status.color }}
                    className='size-4'
                  />
                  {project.name}
                  <div className='ml-auto flex items-center gap-1 text-muted-foreground'>
                    <User className='size-3' />
                    <p className='text-xs'>{project.client.name}</p>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
