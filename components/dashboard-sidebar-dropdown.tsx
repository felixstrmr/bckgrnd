'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { WorkspaceUser } from '@/types'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

type Props = {
  workspaceUser: WorkspaceUser
}

export default function DashboardSidebarDropdown({ workspaceUser }: Props) {
  const [isOpen, setOpen] = React.useState(false)

  const { workspace } = workspaceUser

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'flex h-9 w-58 items-center justify-start gap-2 rounded-md border p-1 pr-2 hover:cursor-pointer',
          isOpen
            ? 'bg-background border-border shadow-xs'
            : 'hover:border-border hover:bg-background border-transparent bg-transparent',
        )}
      >
        <div className='from-primary flex aspect-square size-6 items-center justify-center rounded-sm bg-gradient-to-t to-zinc-600'>
          <span className='text-primary-foreground text-xs uppercase'>
            {workspace.name.slice(0, 2)}
          </span>
        </div>
        <span className='truncate text-sm'>{workspace.name}</span>
        <ChevronsUpDown className='text-muted-foreground ml-auto size-4 shrink-0' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-58'>
        <DropdownMenuItem>Test</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
