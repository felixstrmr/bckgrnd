'use client'

import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  projectId: string
  projectName: string
}

export default function ProjectNavbar({ projectId, projectName }: Props) {
  const segment = useSelectedLayoutSegment()

  const pages = [
    {
      name: 'Overview',
      href: `/dashboard/projects/${projectId}`,
      active: !segment,
    },
    {
      name: 'Tasks',
      href: `/dashboard/projects/${projectId}/tasks`,
      active: segment === 'tasks',
    },
    {
      name: 'Files',
      href: `/dashboard/projects/${projectId}/files`,
      active: segment === 'files',
    },
  ]

  return (
    <nav className='flex flex-col space-y-6'>
      <div className='flex items-center gap-4'>
        <Link
          href={'/dashboard/projects'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ArrowLeft className='size-4' />
        </Link>
        <Separator orientation='vertical' className='h-6' />
        <h4>{projectName}</h4>
      </div>
      <div className='flex items-center gap-2 border-b'>
        {pages.map((page) => (
          <div key={page.name} className='flex flex-col space-y-1'>
            <Link
              href={page.href}
              className={cn(
                'flex h-8 items-center justify-center rounded-md p-3 text-base transition-all hover:bg-muted',
                page.active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {page.name}
            </Link>
            <div
              className={cn(
                'h-px w-full',
                page.active ? 'bg-primary' : 'bg-transparent',
              )}
            />
          </div>
        ))}
      </div>
    </nav>
  )
}
