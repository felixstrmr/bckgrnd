'use client'

import { uploadTaskImageAction } from '@/actions/upload-task-image-action'
import { Button } from '@/components/ui/button'
import { TASK_IMAGE_MAX_SIZE, TASK_IMAGE_TYPES } from '@/lib/constants'
import { TaskImage } from '@/types'
import { Upload } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

type Props = {
  taskId: string
  workspaceId: string
  clientId: string
  projectId: string
  domain: string
  latestImage: TaskImage
}

export default function UploadTaskImageButton({
  taskId,
  workspaceId,
  clientId,
  projectId,
  domain,
  latestImage,
}: Props) {
  const router = useRouter()

  const { execute, status } = useAction(uploadTaskImageAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Uploading image...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Image uploaded successfully')
      router.refresh()
    },
  })
  const loading = status === 'executing'

  const handleImageUpload = React.useCallback(
    async (files: File[]) => {
      const file = files[0]

      if (file.size > TASK_IMAGE_MAX_SIZE) {
        toast.error(
          `Image size must be less than ${TASK_IMAGE_MAX_SIZE / 1024 / 1024}MB`,
        )
        return
      }

      if (!Object.keys(TASK_IMAGE_TYPES).some((type) => file.type === type)) {
        toast.error(
          'Invalid image format. Please use JPEG, PNG, GIF, WEBP, or SVG',
        )
        return
      }

      const formData = new FormData()
      formData.append('image', file)
      formData.append('task', taskId)
      formData.append('domain', domain)
      formData.append('workspace', workspaceId)
      formData.append('client', clientId)
      formData.append('project', projectId)
      formData.append('latestVersion', latestImage?.version?.toString() ?? '0')
      execute(formData)
    },
    [execute, taskId, domain, workspaceId, clientId, projectId, latestImage],
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: TASK_IMAGE_TYPES,
    onDrop: handleImageUpload,
    disabled: loading,
  })

  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      <Upload className='size-4' />
      Upload
    </Button>
  )
}
