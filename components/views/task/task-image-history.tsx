'use client'

import { useTaskVersion } from '@/hooks/use-task-version'
import { formatRelativeTime } from '@/lib/utils'
import { TaskImageWithRelations } from '@/types/custom'
import { Check } from 'lucide-react'
import Image from 'next/image'

type Props = {
  taskImages: TaskImageWithRelations[]
}

export default function TaskImageHistory({ taskImages }: Props) {
  const { setSelectedVersion, selectedVersion } = useTaskVersion(taskImages)

  return (
    <div className='grid grid-cols-2 gap-4 py-4'>
      {taskImages.map((taskImage) => (
        <button
          onClick={() => setSelectedVersion(taskImage.id)}
          key={taskImage.id}
          className='relative rounded-md border p-4'
        >
          <Image
            src={`/api/proxy?path=/files/${taskImage.image.path}`}
            alt={taskImage.image.name}
            width={133}
            height={75}
            className='aspect-video w-full rounded-sm object-cover'
          />
          <div className='flex items-center justify-between gap-2 pt-2'>
            <div className='flex items-center gap-1'>
              <p className='text-sm font-medium'>V{taskImage.version}</p>
              <p className='text-xs text-muted-foreground'>
                {selectedVersion === taskImage.id && (
                  <Check className='size-4 text-green-600' />
                )}
              </p>
            </div>
            <p className='text-xs text-muted-foreground'>
              {formatRelativeTime(new Date(taskImage.created_at))}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
