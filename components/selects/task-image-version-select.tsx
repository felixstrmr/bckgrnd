'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TaskImage } from '@/types'
import { format, isToday } from 'date-fns'
import { parseAsString, useQueryState } from 'nuqs'
type Props = {
  taskImages: TaskImage[]
  latestVersion: number
}

export default function TaskImageVersionSelect({
  taskImages,
  latestVersion,
}: Props) {
  const [selectedVersion, setSelectedVersion] = useQueryState(
    'version',
    parseAsString.withDefault(latestVersion.toString()),
  )

  function formatDate(date: string) {
    if (isToday(date)) return format(date, 'p')
    return format(date, 'do MMM')
  }

  return (
    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
      <SelectTrigger className='h-8'>
        <SelectValue placeholder={`V${latestVersion}`} />
        <div className='w-3' />
      </SelectTrigger>
      <SelectContent>
        {taskImages.map((taskImage) => (
          <SelectItem
            key={taskImage.id}
            value={taskImage.version.toString()}
            className='text-xs'
          >
            V{taskImage.version}
            <span className='ml-1 text-xs text-muted-foreground'>
              ∙ {formatDate(taskImage.created_at)}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
