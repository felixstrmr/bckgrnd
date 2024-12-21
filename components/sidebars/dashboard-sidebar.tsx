'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import BoxSolid from '@/components/icons/solid/box'
import CircleCheckSolid from '@/components/icons/solid/circle-check'
import FileSolid from '@/components/icons/solid/file'
import HouseSolid from '@/components/icons/solid/house'
import UserSolid from '@/components/icons/solid/user'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Box, CircleCheck, File, House, User } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Home',
      href: '/dashboard',
      isActive: !segment,
      icon: House,
      activeIcon: HouseSolid,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      isActive: segment === 'clients',
      icon: User,
      activeIcon: UserSolid,
    },
    {
      name: 'Projects',
      href: '/dashboard/projects',
      isActive: segment === 'projects',
      icon: Box,
      activeIcon: BoxSolid,
    },
    {
      name: 'Tasks',
      href: '/dashboard/tasks',
      isActive: segment === 'tasks',
      icon: CircleCheck,
      activeIcon: CircleCheckSolid,
    },
    {
      name: 'Files',
      href: '/dashboard/files',
      isActive: segment === 'files',
      icon: File,
      activeIcon: FileSolid,
    },
  ]

  return (
    <div className='flex flex-col p-4'>
      <Link href='/dashboard'>
        <Bckgrnd />
      </Link>
      <Separator className='my-4' />
      <div className='space-y-1'>
        {pagesTop.map((page) => (
          <SidebarItem key={page.name} page={page} />
        ))}
      </div>
    </div>
  )
}

type SidebarItemProps = {
  page: {
    name: string
    href: string
    isActive: boolean
    icon: React.ElementType
    activeIcon: React.ElementType
  }
}

function SidebarItem({ page }: SidebarItemProps) {
  return (
    <Tooltip key={page.name} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={page.href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md transition-all',
            page.isActive
              ? 'bg-foreground/10'
              : 'bg-transparent hover:bg-foreground/10',
          )}
        >
          {page.isActive ? (
            <page.activeIcon className='size-4' />
          ) : (
            <page.icon className='size-4 text-muted-foreground' />
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent align='center' side='right'>
        <p>{page.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
