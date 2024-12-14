'use client'

import { updateSidebarCookies } from '@/actions/update-sidebar-cookies-action'
import Bckgrnd from '@/components/icons/bckgrnd'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  Box,
  Files,
  Home,
  ListChecks,
  SidebarClose,
  SidebarOpen,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  defaultOpen?: boolean
}

export default function WorkspaceSidebar({ defaultOpen = true }: Props) {
  const segment = useSelectedLayoutSegment()
  const [collapsed, setCollapsed] = React.useState(defaultOpen)

  const handleCollapse = async (collapsed: boolean) => {
    setCollapsed(collapsed)
    await updateSidebarCookies(collapsed)
  }

  const pages = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      active: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      active: segment === 'clients',
      icon: User,
    },
    {
      name: 'Projects',
      href: '/dashboard/projects',
      active: segment === 'projects',
      icon: Box,
    },
    {
      name: 'Tasks',
      href: '/dashboard/tasks',
      active: segment === 'tasks',
      icon: ListChecks,
    },
    {
      name: 'Files',
      href: '/dashboard/files',
      active: segment === 'files',
      icon: Files,
    },
  ]

  return (
    <nav
      className={cn(
        'flex flex-col p-4 transition-all ease-in-out',
        collapsed ? 'w-16 min-w-16' : 'w-64 min-w-64',
      )}
    >
      <div className='flex h-8 items-center'>
        <Link href={'/dashboard'} className='flex items-center gap-2'>
          <Bckgrnd className='rounded-md shadow' />
          {!collapsed && (
            <span>
              <h4>Bckgrnd</h4>
            </span>
          )}
        </Link>
      </div>
      <Separator className='my-4' />
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={() => handleCollapse(!collapsed)}
        className='mb-4 size-8 hover:bg-foreground/10'
      >
        {collapsed ? (
          <SidebarOpen className='size-4' />
        ) : (
          <SidebarClose className='size-4' />
        )}
      </Button>
      <div className='space-y-1'>
        {pages.map((page) => (
          <Tooltip key={page.name}>
            <TooltipTrigger asChild>
              <Link
                href={page.href}
                className={cn(
                  'flex h-8 items-center rounded-md text-base transition-all',
                  page.active
                    ? 'border-border bg-foreground/10 text-foreground'
                    : 'border-transparent text-muted-foreground hover:bg-foreground/10',
                  collapsed ? 'px-2' : 'px-2',
                )}
                title={collapsed ? page.name : undefined}
              >
                <page.icon className='h-4 w-4 shrink-0' />
                {!collapsed && (
                  <span
                    className={cn(
                      'ml-2 transition-all',
                      collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                    )}
                  >
                    {page.name}
                  </span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>{page.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </nav>
  )
}
