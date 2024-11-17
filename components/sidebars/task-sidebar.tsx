'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, MessageCircle } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export default function TaskSidebar() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('comments'),
  )

  return (
    <div className='w-80 min-w-80 rounded-lg border p-4'>
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
    </div>
  )
}
