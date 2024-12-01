'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft, LucideIcon, Palette, Users, View } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  clientId: string
}

export default function ClientSidebar({ clientId }: Props) {
  const segment = useSelectedLayoutSegment()

  const pagesTop = [
    {
      name: 'Overview',
      href: `/clients/${clientId}`,
      isActive: !segment,
      icon: View,
    },
    {
      name: 'Users',
      href: `/clients/${clientId}/users`,
      isActive: segment === 'users',
      icon: Users,
    },
    {
      name: 'Branding',
      href: `/clients/${clientId}/branding`,
      isActive: segment === 'branding',
      icon: Palette,
    },
  ] as SidebarItemProps[]

  return (
    <div className='h-full w-64 min-w-64 border-r p-6'>
      <div className='flex items-center justify-between'>
        <Link
          href={'/clients'}
          className='flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Clients
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
