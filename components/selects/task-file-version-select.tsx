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
  const [selectedTaskFileId, setSelectedTaskFileId] = useQueryState(
    'version',
    parseAsString
      .withDefault(taskFileVersions[0].id)
      .withOptions({ shallow: false }),
  )

  return (
    <Select value={selectedTaskFileId} onValueChange={setSelectedTaskFileId}>
      <SelectTrigger className='w-32'>
        <SelectValue placeholder='Version' />
      </SelectTrigger>
      <SelectContent>
        {taskFileVersions.map(({ id, version }) => (
          <SelectItem key={id} value={id}>
            Version {version}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
