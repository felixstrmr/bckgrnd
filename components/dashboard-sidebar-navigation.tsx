'use client'

import { cn } from '@/lib/utils'
import {
  Box,
  CircleCheck,
  File,
  Home,
  LucideIcon,
  Settings,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebarNavigation() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      isActive: segment === null,
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: User,
      isActive: segment === 'clients',
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Box,
      isActive: segment === 'projects',
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CircleCheck,
      isActive: segment === 'tasks',
    },
    {
      name: 'Files',
      href: '/files',
      icon: File,
      isActive: segment === 'files',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      isActive: segment === 'settings',
    },
  ]

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='space-y-1'>
        {itemsTop.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </div>
      <div className='space-y-1'>
        {itemsBottom.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  icon: LucideIcon
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={`/dashboard/${item.href}`}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md border px-2',
        item.isActive
          ? 'text-foreground bg-background border-border shadow-xs'
          : 'text-muted-foreground hover:bg-background hover:border-border border-transparent bg-transparent',
      )}
    >
      <item.icon className='size-4' />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
