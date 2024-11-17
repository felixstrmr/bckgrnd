'use client'

import { uploadTaskImageAction } from '@/actions/upload-task-image-action'
import { TASK_IMAGE_MAX_SIZE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { TaskImage } from '@/types'
import { ImageIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

type Props = {
  taskImages: TaskImage[]
  taskId: string
  domain: string
}

export default function TaskImageCanvas({ taskImages, taskId, domain }: Props) {
  const router = useRouter()

  const latestImage =
    taskImages.length > 0
      ? taskImages.reduce((prev, current) =>
          prev.version > current.version ? prev : current,
        )
      : null

  const [] = useQueryState(
    'version',
    parseAsInteger.withDefault(latestImage?.version || 1),
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp', '.svg'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > TASK_IMAGE_MAX_SIZE) {
        toast.error(`Image size exceeds ${TASK_IMAGE_MAX_SIZE / 1024 / 1024}MB`)
        return
      }

      if (!acceptedFiles[0].type.startsWith('image/')) {
        toast.error('Invalid image format')
        return
      }

      const formData = new FormData()
      formData.append('image', acceptedFiles[0])
      formData.append('task', taskId)
      formData.append('domain', domain)

      execute(formData)
    },
  })

  const { execute } = useAction(uploadTaskImageAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: () => {
      toast.success('Image uploaded')
      router.refresh()
    },
  })

  return (
    <>
      {taskImages.length === 0 ? (
        <div
          {...getRootProps()}
          className={cn(
            'flex size-full items-center justify-center rounded-lg border border-dashed transition-all hover:cursor-pointer hover:bg-muted',
            isDragActive && 'border-blue-600',
          )}
        >
          <input {...getInputProps()} />
          <div className='flex flex-col items-center gap-2'>
            <ImageIcon className='size-9 text-muted-foreground' />
            <h6>
              Drag and drop image or{' '}
              <span className='text-foreground underline'>browse</span>
            </h6>
            <p className='text-xs text-muted-foreground'>
              JPEG, PNG, GIF, WEBP, SVG - Max 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className='size-full rounded-lg border p-4'>
          {latestImage && (
            <Image
              src={latestImage.image_url}
              width={100}
              height={100}
              alt='Task Image'
            />
          )}
        </div>
      )}
    </>
  )
}
