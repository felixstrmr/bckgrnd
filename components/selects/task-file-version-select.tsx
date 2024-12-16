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
    parseAsString.withDefault(taskFileVersions[0]?.id).withOptions({
      shallow: false,
    }),
  )

  if (taskFileVersions.length === 0) {
    return null
  }

  if (taskFileVersions.length === 1) {
    return (
      <div className='flex h-8 items-center gap-2 p-3 text-sm'>
        <p className='text-xs text-muted-foreground'>V1</p>
      </div>
    )
  }

  return (
    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
      <SelectTrigger className='w-16'>
        <SelectValue placeholder='Version' />
      </SelectTrigger>
      <SelectContent className='w-16 min-w-16'>
        {taskFileVersions.map(({ id, version }) => (
          <SelectItem key={id} value={id} className='flex'>
            <span className='text-xs'>V{version}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
