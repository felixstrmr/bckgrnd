'use client'

import { ThemeDropdown } from '@/components/dropdowns/theme-dropdown'
import Bckgrnd from '@/components/icons/bckgrnd'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Cog, FolderKanban, Home, LucideIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function WorkspaceSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      isActive: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      isActive: segment === 'clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/dashboard/projects',
      isActive: segment === 'projects' || segment === 'tasks',
      icon: FolderKanban,
    },
  ] as SidebarItemProps[]

  const pagesBottom = [
    {
      name: 'Settings',
      href: '/dashboard/settings',
      isActive: segment === 'settings',
      icon: Cog,
    },
  ]

  return (
    <aside className='flex h-full flex-col p-4'>
      <Link href={'/'}>
        <Bckgrnd className='size-9 invert dark:invert-0' />
      </Link>
      <Separator className='my-4' />
      <div className='flex h-full flex-col justify-between'>
        <div className='flex flex-col space-y-1'>
          {pagesTop.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
        <div className='flex flex-col space-y-1'>
          <ThemeDropdown />
          {pagesBottom.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  href: string
  name: string
  isActive: boolean
  icon: LucideIcon
}

function SidebarItem({ href, isActive, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex size-9 items-center justify-center rounded-md border transition-all',
        isActive
          ? 'border-border bg-background text-foreground shadow-sm'
          : 'border-transparent bg-transparent text-muted-foreground hover:bg-background',
      )}
    >
      <Icon className='size-4' />
    </Link>
  )
}
