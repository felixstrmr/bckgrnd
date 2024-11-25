'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft, Cog, Files, ListTodo, LucideIcon, View } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  projectId: string
}

export default function ProjectSidebar({ projectId }: Props) {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Overview',
      href: `/projects/${projectId}`,
      isActive: !segment,
      icon: View,
    },
    {
      name: 'Tasks',
      href: `/projects/${projectId}/tasks`,
      isActive: segment === 'tasks',
      icon: ListTodo,
    },
    {
      name: 'Files',
      href: `/projects/${projectId}/files`,
      isActive: segment === 'files',
      icon: Files,
    },
    {
      name: 'Settings',
      href: `/projects/${projectId}/settings`,
      isActive: segment === 'settings',
      icon: Cog,
    },
  ] as SidebarItemProps[]

  return (
    <div className='h-full w-64 min-w-64 border-r p-6'>
      <div className='flex items-center justify-between'>
        <Link
          href={'/projects'}
          className='flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Projects
        </Link>
      </div>
      <Separator className='my-4' />
      <div className='flex flex-col space-y-1'>
        {pagesTop.map((page) => (
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
