'use client'

import { uploadTaskImageAction } from '@/actions/upload-task-image-action'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TASK_IMAGE_MAX_SIZE, TASK_IMAGE_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUploadTaskImageModalStore } from '@/store/upload-task-image-modal-store'
import { TaskImage } from '@/types'
import { Loader2, Upload } from 'lucide-react'
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

export default function UploadTaskImageDialog({
  taskId,
  workspaceId,
  clientId,
  projectId,
  domain,
  latestImage,
}: Props) {
  const router = useRouter()
  const { open, setOpen } = useUploadTaskImageModalStore()

  const { execute, status } = useAction(uploadTaskImageAction, {
    onError: ({ error }) => {
      toast.error(error.serverError || 'Failed to upload image')
    },
    onSuccess: () => {
      setOpen(false)
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
      formData.append('latestVersion', latestImage.version.toString())
      execute(formData)
    },
    [execute, taskId, domain, workspaceId, clientId, projectId, latestImage],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: TASK_IMAGE_TYPES,
    onDrop: handleImageUpload,
    disabled: loading,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className='size-4' />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Task Image</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className='flex items-center justify-center rounded-md border p-12'>
            <Loader2 className='size-6 animate-spin' />
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'rounded-md border border-dashed p-12 transition-colors hover:cursor-pointer hover:bg-muted',
              isDragActive && 'border-blue-600',
            )}
          >
            <input {...getInputProps()} />
            <div className='flex flex-col items-center gap-2'>
              <div className='rounded-full bg-muted p-3'>
                <Upload className='size-6 text-muted-foreground' />
              </div>
              <h6>Click to upload</h6>
              <p className='text-sm text-muted-foreground'>
                Max 10MB, JPEG, PNG, GIF, WEBP, SVG
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
