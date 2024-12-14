'use client'

import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft, Files, ListChecks, View } from 'lucide-react'
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
      href: `/dashboard/projects/${projectId}`,
      active: !segment,
      icon: View,
    },
    {
      name: 'Tasks',
      href: `/dashboard/projects/${projectId}/tasks`,
      active: segment === 'tasks',
      icon: ListChecks,
    },
    {
      name: 'Files',
      href: `/dashboard/projects/${projectId}/files`,
      active: segment === 'files',
      icon: Files,
    },
  ]

  return (
    <div className='flex w-64 min-w-64 flex-col border-r p-4'>
      <div className='flex items-center gap-2'>
        <Link
          href={'/dashboard/projects'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ArrowLeft className='size-4' />
        </Link>

        <h4>Project</h4>
      </div>
      <Separator className='my-4' />
      <div className='space-y-1'>
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={cn(
              'flex h-8 items-center gap-2 rounded-md p-2 text-base transition-all',
              page.active
                ? 'bg-muted text-foreground'
                : 'bg-transparent text-muted-foreground hover:bg-muted',
            )}
          >
            <page.icon className='size-4' />
            <span>{page.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
