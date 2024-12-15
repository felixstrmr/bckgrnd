'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  taskFileVersions: { id: string; version: number }[]
}

export default function TaskFileVersionSelect({ taskFileVersions }: Props) {
  const [selectedVersion, setSelectedVersion] = useQueryState(
    'version',
    parseAsString.withDefault(taskFileVersions[0].id).withOptions({
      shallow: false,
    }),
  )

  if (taskFileVersions.length === 1) {
    return (
      <div className='flex h-8 items-center gap-2 p-3 text-sm'>
        <p className='text-xs text-muted-foreground'>V1</p>
        <p>Latest</p>
      </div>
    )
  }

  const isLatest = (id: string) => id === taskFileVersions[0].id

  return (
    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
      <SelectTrigger className='w-32 border-none shadow-none'>
        <SelectValue placeholder='Version' />
      </SelectTrigger>
      <SelectContent>
        {taskFileVersions.map(({ id, version }) => (
          <SelectItem key={id} value={id} className='flex'>
            <span className='mr-2 text-xs text-muted-foreground'>
              V{version}
            </span>
            <span className='text-sm'>
              {isLatest(id) ? 'Latest' : `Version ${version}`}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
