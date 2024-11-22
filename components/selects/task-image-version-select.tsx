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
  latestImage: TaskImage
}

export default function TaskImageVersionSelect({
  taskImages,
  latestImage,
}: Props) {
  const [selectedVersion, setSelectedVersion] = useQueryState(
    'version',
    parseAsString
      .withDefault(latestImage.id)
      .withOptions({ clearOnDefault: false }),
  )

  return (
    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
      <SelectTrigger className='h-8'>
        <SelectValue placeholder={`V${latestImage.version}`} />
        <div className='w-1' />
      </SelectTrigger>
      <SelectContent className='min-w-fit'>
        {taskImages.map((taskImage) =>
          taskImage.id === latestImage.id ? (
            <SelectItem
              key={taskImage.id}
              value={taskImage.id}
              className='text-xs'
            >
              Latest
            </SelectItem>
          ) : (
            <SelectItem
              key={taskImage.id}
              value={taskImage.id}
              className='text-xs'
            >
              V{taskImage.version}
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  )
}
