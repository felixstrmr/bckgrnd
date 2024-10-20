'use client'

import { cn } from '@/lib/utils'
import { Archive, Cog, Lock, LucideIcon, Palette, User } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesPersonal = [
    {
      name: 'Profile',
      href: '/settings',
      active: !segment,
      icon: User,
    },
    {
      name: 'Security',
      href: '/settings/security',
      active: segment === 'security',
      icon: Lock,
    },
  ] as SidebarItemProps[]

  const pagesWorkspace = [
    {
      name: 'General',
      href: '/settings/general',
      active: segment === 'general',
      icon: Cog,
    },
    {
      name: 'Branding',
      href: '/settings/branding',
      active: segment === 'branding',
      icon: Palette,
    },
    {
      name: 'Storage',
      href: '/settings/storage',
      active: segment === 'storage',
      icon: Archive,
    },
  ] as SidebarItemProps[]

  return (
    <div className='h-full w-64 min-w-64 border-r p-6'>
      <h4>Settings</h4>
      <div className='mt-4 h-full space-y-4'>
        <div className='flex flex-col space-y-1'>
          <p className='mb-1 text-xs text-muted-foreground'>Personal</p>
          {pagesPersonal.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='mb-1 text-xs text-muted-foreground'>Workspace</p>
          {pagesWorkspace.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
      </div>
    </div>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  active: boolean
  icon: LucideIcon
}

function SidebarItem({ name, href, active, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-9 items-center gap-2 rounded-md border p-2 text-sm transition-all',
        active
          ? 'border-border bg-muted text-foreground shadow-sm'
          : 'border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className='size-4' />
      {name}
    </Link>
  )
}
