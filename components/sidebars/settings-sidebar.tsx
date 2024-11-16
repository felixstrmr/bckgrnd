'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Briefcase, LucideIcon, User } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesPersonal = [
    {
      name: 'My Account',
      href: '/settings',
      isActive: !segment,
      icon: User,
    },
  ] as SidebarItemProps[]

  const pagesWorkspace = [
    {
      name: 'General',
      href: '/settings/general',
      isActive: segment === 'general',
      icon: Briefcase,
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
