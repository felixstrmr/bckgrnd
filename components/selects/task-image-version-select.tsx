'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTaskVersion } from '@/hooks/use-task-version'
import { TaskImageWithRelations } from '@/types/custom'

type Props = {
  taskImages: TaskImageWithRelations[]
}

export default function TaskImageVersionSelect({ taskImages }: Props) {
  const { selectedVersion, setSelectedVersion, latestImage } =
    useTaskVersion(taskImages)

  const sortedImages = [...taskImages].sort((a, b) => b.version - a.version)

  return (
    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
      <SelectTrigger className='h-8'>
        <SelectValue placeholder={`V${latestImage?.version}`} />
        <div className='w-1' />
      </SelectTrigger>
      <SelectContent className='min-w-fit'>
        {sortedImages.map((taskImage) => (
          <SelectItem
            key={taskImage.id}
            value={taskImage.id}
            className='text-xs'
          >
            {taskImage.id === latestImage?.id ? (
              <>
                Latest
                <span className='ml-1 text-xs text-muted-foreground'>
                  V{taskImage.version}
                </span>
              </>
            ) : (
              `V${taskImage.version}`
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
