'use client'

import ProfileDropdown from '@/components/dropdowns/profile-dropdown'
import Bckgrnd from '@/components/icons/bckgrnd'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { User } from '@/types'
import { Cog, FolderKanban, Home, LucideIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  user: User
}

export default function WorkspaceSidebar({ user }: Props) {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Home',
      href: '/',
      active: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/clients',
      active: segment === 'clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/projects',
      active: segment === 'projects',
      icon: FolderKanban,
    },
  ] as SidebarItemProps[]

  const pagesBottom = [
    {
      name: 'Settings',
      href: '/settings',
      active: segment === 'settings',
      icon: Cog,
    },
  ] as SidebarItemProps[]

  return (
    <div className='flex h-full flex-col bg-muted p-4'>
      <Link href={'/'}>
        <Bckgrnd />
      </Link>
      <Separator className='my-4' />
      <div className='flex h-full flex-col justify-between'>
        <div className='flex flex-col space-y-1'>
          {pagesTop.map((page) => (
            <SidebarItem key={page.name} {...page} />
          ))}
        </div>
        <div>
          <div className='flex flex-col space-y-1'>
            {pagesBottom.map((page) => (
              <SidebarItem key={page.name} {...page} />
            ))}
          </div>
          <Separator className='my-4' />
          <ProfileDropdown user={user} />
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
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn(
              'group flex size-9 items-center justify-center rounded-md border transition-all',
              active
                ? 'border-border bg-background shadow-sm'
                : 'border-transparent bg-transparent hover:bg-background',
            )}
          >
            <Icon
              className={cn(
                'size-4',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground',
              )}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent align='start' side='right'>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
