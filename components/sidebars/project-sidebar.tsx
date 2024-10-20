'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Cog,
  Files,
  ListTodo,
  LucideIcon,
  PlusCircle,
  Search,
  View,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  projectId: string
}

export default function ProjectSidebar({ projectId }: Props) {
  const segment = useSelectedLayoutSegment()

  const pages = [
    {
      name: 'Overview',
      href: `/projects/${projectId}`,
      active: !segment,
      icon: View,
    },
    {
      name: 'Tasks',
      href: `/projects/${projectId}/tasks`,
      active: segment === 'tasks',
      icon: ListTodo,
    },
    {
      name: 'Files',
      href: `/projects/${projectId}/files`,
      active: segment === 'files',
      icon: Files,
    },
    {
      name: 'Settings',
      href: `/projects/${projectId}/settings`,
      active: segment === 'settings',
      icon: Cog,
    },
  ] as SidebarItemProps[]

  return (
    <div className='h-full w-64 min-w-64 border-r p-6'>
      <div className='flex justify-between'>
        <Link
          href={'/projects'}
          className='flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Projects
        </Link>

        <div className='flex'>
          <Button size={'icon'} variant={'ghost'}>
            <Search />
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <PlusCircle />
          </Button>
        </div>
      </div>
      <div className='mt-4 flex flex-col space-y-1'>
        {pages.map((page) => (
          <SidebarItem key={page.name} {...page} />
        ))}
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
