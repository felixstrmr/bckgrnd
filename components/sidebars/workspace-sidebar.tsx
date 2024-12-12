'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Bell, Box, Files, Home, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function WorkspaceSidebar() {
  const segment = useSelectedLayoutSegment()

  const pages = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      active: !segment,
      icon: Home,
    },
    {
      name: 'Clients',
      href: '/dashboard/clients',
      active: segment === 'clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/dashboard/projects',
      active: segment === 'projects' || segment === 'tasks',
      icon: Box,
    },
    {
      name: 'Files',
      href: '/dashboard/files',
      active: segment === 'files',
      icon: Files,
    },
  ]

  return (
    <nav className='flex min-w-64 flex-col p-4'>
      <div className='flex items-center justify-between'>
        <Link href={'/'} className='flex items-center gap-2'>
          <Bckgrnd className='rounded-md shadow' />
          <h4>Bckgrnd</h4>
        </Link>
        <Button size={'icon'} variant={'outline'}>
          <Bell />
        </Button>
      </div>
      <Separator className='my-4' />
      <div className='space-y-1'>
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={cn(
              'flex h-8 items-center justify-start gap-2 rounded-md border p-3 text-base transition-all',
              page.active
                ? 'border-border bg-foreground/10 text-foreground'
                : 'border-transparent text-muted-foreground hover:bg-foreground/10',
            )}
          >
            <page.icon className='size-4' />
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
