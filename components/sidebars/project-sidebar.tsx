'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  Cog,
  Files,
  ListTodo,
  LucideIcon,
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
      isCurrent: !segment,
      icon: View,
    },
    {
      name: 'Tasks',
      href: `/projects/${projectId}/tasks`,
      isCurrent: segment === 'tasks',
      icon: ListTodo,
    },
    {
      name: 'Files',
      href: `/projects/${projectId}/files`,
      isCurrent: segment === 'files',
      icon: Files,
    },
    {
      name: 'Settings',
      href: `/projects/${projectId}/settings`,
      isCurrent: segment === 'settings',
      icon: Cog,
    },
  ] as SidebarItemProps[]

  return (
    <aside className='flex h-full min-w-64 flex-col border-r p-4'>
      <div className='flex h-9 items-center'>
        <Link
          href={'/projects'}
          className='flex items-center text-sm text-muted-foreground transition-all hover:text-foreground'
        >
          <ChevronLeft className='mr-1 size-4' />
          All projects
        </Link>
      </div>
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
