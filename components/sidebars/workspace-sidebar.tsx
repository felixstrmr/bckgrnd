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
  Cog,
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
  defaultOpen: boolean
}

export default function WorkspaceSidebar({ defaultOpen }: Props) {
  const segment = useSelectedLayoutSegment()
  const [collapsed, setCollapsed] = React.useState(defaultOpen)

  const handleCollapse = async (collapsed: boolean) => {
    setCollapsed(collapsed)
    await updateSidebarCookies(collapsed)
  }

  const pagesTop = [
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

  const pagesBottom = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      active: segment === 'settings',
      icon: Cog,
    },
  ]

  const NavLink = ({ page }: { page: (typeof pagesTop)[0] }) => {
    const link = (
      <Link
        href={page.href}
        className={cn(
          'flex h-8 items-center rounded-md text-base transition-all',
          page.active
            ? 'border-border bg-foreground/10 text-foreground'
            : 'border-transparent text-muted-foreground hover:bg-foreground/10',
          'px-2',
        )}
      >
        <page.icon className='size-4 shrink-0' />
        {!collapsed && <span className='ml-2 transition-all'>{page.name}</span>}
      </Link>
    )

    if (!collapsed) return link

    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side='right'>{page.name}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <nav
      className={cn(
        'flex flex-col p-4 transition-all ease-in-out',
        collapsed ? 'w-16 min-w-16' : 'w-64 min-w-64',
      )}
    >
      <div className='flex h-8 items-center'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <Bckgrnd className='rounded-md shadow' />
          {!collapsed && <h4>Bckgrnd</h4>}
        </Link>
      </div>
      <Separator className='my-4' />

      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-1'>
          {pagesTop.map((page) => (
            <NavLink key={page.name} page={page} />
          ))}
        </div>

        <div className='space-y-1'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => handleCollapse(!collapsed)}
            className='size-8 hover:bg-foreground/10'
          >
            {collapsed ? (
              <SidebarOpen className='size-4' />
            ) : (
              <SidebarClose className='size-4' />
            )}
          </Button>
          {pagesBottom.map((page) => (
            <NavLink key={page.name} page={page} />
          ))}
        </div>
      </div>
    </nav>
  )
}
