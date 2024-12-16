'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { parseAsString, useQueryState } from 'nuqs'

export default function TaskSidebarTabs() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('details').withOptions({ shallow: false }),
  )

  return (
    <Tabs value={tab} onValueChange={setTab} className='p-4'>
      <TabsList className='h-fit gap-1 bg-transparent p-0 shadow-none'>
        <TabsTrigger
          value='details'
          className='py-0.5 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none'
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value='comments'
          className='py-0.5 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none'
        >
          Comments
        </TabsTrigger>
        <TabsTrigger
          value='versions'
          className='py-0.5 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none'
        >
          Versions
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
