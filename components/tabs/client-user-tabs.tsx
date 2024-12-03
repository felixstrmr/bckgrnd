'use client'

import { cn } from '@/lib/utils'
import { Mail, Users } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export default function ClientUserTabs() {
  const [currentTab, setCurrentTab] = useQueryState(
    'tab',
    parseAsString.withDefault('users'),
  )

  const tabs = [
    { label: 'Active', value: 'users', icon: <Users className='size-4' /> },
    {
      label: 'Invited',
      value: 'invited',
      icon: <Mail className='size-4' />,
    },
  ]

  return (
    <div className='flex w-full border-b'>
      {tabs.map((tab) => (
        <div key={tab.value} className='flex flex-col'>
          <button
            onClick={() => setCurrentTab(tab.value)}
            className={cn(
              'mb-1 flex h-8 items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-all hover:bg-muted',
              currentTab === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
          <div
            className={cn(
              'h-px w-full transition-all',
              currentTab === tab.value ? 'bg-primary' : 'bg-transparent',
            )}
          />
        </div>
      ))}
    </div>
  )
}
