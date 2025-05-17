'use client'

import BckgrndIcon from '@/components/icons/bckgrnd-icon'
import BoxIcon from '@/components/icons/box-icon'
import FileIcon from '@/components/icons/file-icon'
import HouseIcon from '@/components/icons/house-icon'
import SettingsIcon from '@/components/icons/settings-icon'
import UserIcon from '@/components/icons/user-icon'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Box, File, House, LucideIcon, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebarNavigation() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: House,
      activeIcon: HouseIcon,
      isActive: segment === null,
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: User,
      activeIcon: UserIcon,
      isActive: segment === 'clients',
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Box,
      activeIcon: BoxIcon,
      isActive: segment === 'projects',
    },
    {
      name: 'Files',
      href: '/files',
      icon: File,
      activeIcon: FileIcon,
      isActive: segment === 'files',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      activeIcon: SettingsIcon,
      isActive: segment === 'settings',
    },
  ]

  return (
    <div className='bg-muted flex h-full flex-col border-r p-4'>
      <Link href={'/dashboard'}>
        <BckgrndIcon />
      </Link>
      <Separator className='my-4' />
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
    </div>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  icon: LucideIcon
  activeIcon: React.ComponentType<{ className?: string }>
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={`/dashboard/${item.href}`}
      className={cn(
        'flex size-8 items-center justify-center gap-2 rounded-md border',
        item.isActive
          ? 'text-foreground bg-background border-border shadow-xs'
          : 'text-muted-foreground hover:bg-background hover:border-border border-transparent bg-transparent',
      )}
    >
      {item.isActive ? (
        <item.activeIcon className='size-4 shrink-0' />
      ) : (
        <item.icon className='size-4 shrink-0' />
      )}
    </Link>
  )
}
