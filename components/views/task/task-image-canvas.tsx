'use client'

import { TaskImage } from '@/types'
import Image from 'next/image'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

type Props = {
  taskImages: TaskImage[]
  taskId: string
  domain: string
}

export default function TaskImageCanvas({ taskImages }: Props) {
  const latestImage = React.useMemo(() => {
    if (taskImages.length === 0) return null
    return taskImages.reduce((prev, current) =>
      prev.version > current.version ? prev : current,
    )
  }, [taskImages])

  const [selectedVersion] = useQueryState(
    'version',
    parseAsString.withDefault(latestImage?.version.toString() || '0'),
  )

  const currentImage = React.useMemo(() => {
    if (!latestImage) return null
    return taskImages.find(
      (image) => image.version === parseInt(selectedVersion),
    )
  }, [taskImages, latestImage, selectedVersion])

  return (
    <div className='relative size-full rounded-lg border p-4'>
      {currentImage && (
        <Image
          src={currentImage.image_url}
          width={1920}
          height={1080}
          className='size-full object-contain'
          unoptimized
          alt='Task Image'
        />
      )}
    </div>
  )
}
