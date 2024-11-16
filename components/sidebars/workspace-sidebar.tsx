'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { FolderKanban, Home, LucideIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function WorkspaceSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Dashboard',
      href: '/',
      isActive: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/clients',
      isActive: segment === 'clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/projects',
      isActive: segment === 'projects',
      icon: FolderKanban,
    },
  ] as SidebarItemProps[]

  return (
    <aside className='flex h-full flex-col p-4'>
      <Link href={'/'}>
        <Bckgrnd className='size-9' />
      </Link>
      <Separator className='my-4' />
      <div>
        <div className='flex flex-col space-y-1'>
          {pagesTop.map((page) => (
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
          ? 'border-border bg-background text-foreground'
          : 'border-transparent bg-transparent text-muted-foreground hover:bg-background',
      )}
    >
      <Icon className='size-4' />
    </Link>
  )
}
