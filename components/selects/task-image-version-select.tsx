'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TaskImage } from '@/types'
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
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
