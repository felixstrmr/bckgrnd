'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Kanban, List } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export default function ProjectViewTabs() {
  const [view, setView] = useQueryState(
    'view',
    parseAsString.withDefault('list').withOptions({ shallow: false }),
  )

  return (
    <Tabs value={view} onValueChange={setView}>
      <TabsList>
        <TabsTrigger value='list'>
          <List className='size-4' />
        </TabsTrigger>
        <TabsTrigger value='kanban'>
          <Kanban className='size-4' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
