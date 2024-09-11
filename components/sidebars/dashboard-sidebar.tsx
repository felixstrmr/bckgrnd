'use client'

import Icon from '@/components/brand/icon'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Building, Home, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const pages = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      isCurrent: segment === 'dashboard',
      icon: Home,
    },
    {
      name: 'Workspaces',
      href: '/workspaces',
      isCurrent: segment === 'workspaces',
      icon: Building,
    },
  ] as SidebarItemProps[]

  return (
    <aside className='flex h-full min-w-64 flex-col border-r p-4'>
      <Link href={'/dashboard'}>
        <Icon />
      </Link>
      <Separator className='my-4' />
      <div className='flex flex-col space-y-1'>
        {pages.map((page) => (
          <SidebarItem key={page.name} {...page} />
        ))}
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  isCurrent: boolean
  icon: LucideIcon
}

function SidebarItem({ name, href, isCurrent, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-9 items-center rounded-md border px-3 text-sm transition-all',
        isCurrent
          ? 'border-border bg-muted shadow-sm'
          : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className='mr-2 size-4' />
      {name}
    </Link>
  )
}
