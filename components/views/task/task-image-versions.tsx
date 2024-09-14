'use client'

import { cn } from '@/lib/utils'
import { useUploadTaskImageStore } from '@/store/upload-task-image-store'
import { TaskImage } from '@/types'
import { CirclePlus } from 'lucide-react'
import Image from 'next/image'
import { parseAsInteger, useQueryState } from 'nuqs'

type Props = {
  taskImages: TaskImage[]
  defaultVersion: number
}

export default function TaskImageVersions({
  taskImages,
  defaultVersion,
}: Props) {
  const [currentVersion, setCurrentVersion] = useQueryState(
    'version',
    parseAsInteger.withDefault(defaultVersion).withOptions({ shallow: true }),
  )

  const { setOpen } = useUploadTaskImageStore()

  const handleOnClick = (version: number) => {
    setCurrentVersion(version)
  }

  return (
    <div className='h-full w-48 min-w-48 space-y-1 rounded-lg border p-2'>
      {taskImages.map((taskImage) => (
        <button
          key={taskImage.id}
          onClick={() => handleOnClick(taskImage.version)}
          className={cn(
            'relative aspect-video overflow-hidden rounded-sm border-2',
            currentVersion === taskImage.version
              ? 'border-blue-500'
              : 'border-transparent',
          )}
        >
          <div
            className={cn(
              'absolute bottom-1 right-1 rounded-full px-2 py-0.5 text-xs',
              currentVersion === taskImage.version
                ? 'bg-blue-500 text-white'
                : 'bg-muted text-muted-foreground',
            )}
          >
            V{taskImage.version}
          </div>
          <Image
            className='size-full object-cover'
            src={taskImage.image_url}
            alt={taskImage.id}
            width={180}
            height={100}
          />
        </button>
      ))}
      <button
        onClick={() => setOpen(true)}
        className='flex aspect-video w-full items-center justify-center rounded-sm border transition-all hover:border-primary/25 hover:bg-muted/25'
      >
        <CirclePlus className='size-4 text-muted-foreground' />
      </button>
    </div>
  )
}
