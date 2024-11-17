'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Bell,
  Briefcase,
  CreditCard,
  Lock,
  LucideIcon,
  User,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesPersonal = [
    {
      name: 'Profile',
      href: '/settings',
      isActive: !segment,
      icon: User,
    },
    {
      name: 'Security',
      href: '/settings/security',
      isActive: segment === 'security',
      icon: Lock,
    },
    {
      name: 'Notifications',
      href: '/settings/notifications',
      isActive: segment === 'notifications',
      icon: Bell,
    },
  ] as SidebarItemProps[]

  const pagesWorkspace = [
    {
      name: 'General',
      href: '/settings/general',
      isActive: segment === 'general',
      icon: Briefcase,
    },
    {
      name: 'Users',
      href: '/settings/users',
      isActive: segment === 'users',
      icon: Users,
    },
    {
      name: 'Billing',
      href: '/settings/billing',
      isActive: segment === 'billing',
      icon: CreditCard,
    },
  ] as SidebarItemProps[]

  return (
    <div className='h-full w-64 min-w-64 border-r p-6'>
      <h3>Settings</h3>
      <Separator className='my-4' />
      <div className='flex flex-col space-y-1'>
        <p className='mb-1 font-mono text-xs text-muted-foreground'>PERSONAL</p>
        {pagesPersonal.map((page) => (
          <SidebarItem key={page.name} {...page} />
        ))}
      </div>
      <div className='mt-6 flex flex-col space-y-1'>
        <p className='mb-1 font-mono text-xs text-muted-foreground'>
          WORKSPACE
        </p>
        {pagesWorkspace.map((page) => (
          <SidebarItem key={page.name} {...page} />
        ))}
      </div>
    </div>
  )
}

type SidebarItemProps = {
  href: string
  name: string
  isActive: boolean
  icon: LucideIcon
}

function SidebarItem({ href, name, isActive, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-9 items-center justify-start gap-2 rounded-md border p-2 text-sm transition-all',
        isActive
          ? 'border-border bg-muted text-foreground'
          : 'border-transparent bg-transparent text-muted-foreground hover:bg-muted',
      )}
    >
      <Icon className='size-4' />
      {name}
    </Link>
  )
}
