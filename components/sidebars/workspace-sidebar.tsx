'use client'

import Icon from '@/components/brand/icon'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Cog, FolderKanban, Home, LucideIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function WorkspaceSidebar() {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Home',
      href: '/',
      isCurrent: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/clients',
      isCurrent: segment === 'clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/projects',
      isCurrent: segment === 'projects' || segment === 'tasks',
      icon: FolderKanban,
    },
  ] as SidebarItemProps[]

  const pagesBottom = [
    {
      name: 'Settings',
      href: '/settings',
      isCurrent: segment === 'settings',
      icon: Cog,
    },
  ] as SidebarItemProps[]

  return (
    <aside className='flex h-full flex-col border-r p-4'>
      <Link href={'/'}>
        <Icon />
      </Link>
      <Separator className='my-4' />
      <div className='flex h-full flex-col justify-between'>
        <div className='flex flex-col space-y-1'>
          {pagesTop.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
        <div className='flex flex-col space-y-1'>
          {pagesBottom.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
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
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn(
              'flex size-9 items-center justify-center rounded-md border transition-all',
              isCurrent
                ? 'border-border bg-muted shadow-sm'
                : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className='size-4' />
          </Link>
        </TooltipTrigger>
        <TooltipContent side='right' align='start'>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
