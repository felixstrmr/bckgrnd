'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Workspace } from '@/types'
import { FolderKanban, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  workspace: Workspace
}

export default function PortalSidebar({ workspace }: Props) {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Projects',
      href: '/projects',
      isActive: !segment,
      icon: FolderKanban,
    },
  ] as SidebarItemProps[]

  return (
    <div className='flex h-full w-64 min-w-64 flex-col p-4'>
      {workspace.logo ? (
        <Image
          src={`/api/proxy?path=/files/${workspace.logo}`}
          alt={workspace.name}
          width={24}
          height={24}
        />
      ) : (
        <h5 className='truncate'>{workspace.name}</h5>
      )}
      <Separator className='my-4' />
      <div className='flex w-full flex-col space-y-1'>
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

function SidebarItem({ href, isActive, icon: Icon, name }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-9 items-center justify-start gap-2 rounded-md border p-2 text-sm transition-all',
        isActive
          ? 'border-border bg-background text-foreground shadow-sm'
          : 'border-transparent bg-transparent text-muted-foreground hover:bg-background',
      )}
    >
      <Icon className='size-4' />
      {name}
    </Link>
  )
}
