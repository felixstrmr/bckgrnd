'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, MessageCircle } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export default function TaskSidebarTabs() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('comments'),
  )

  return (
    <Tabs className='w-full' value={tab} onValueChange={setTab}>
      <TabsList className='w-full'>
        <TabsTrigger value='comments' className='w-full'>
          <MessageCircle className='mr-2 size-4' />
          Comments
        </TabsTrigger>
        <TabsTrigger value='history' className='w-full'>
          <History className='mr-2 size-4' />
          History
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
