'use client'

import { uploadTaskImageAction } from '@/actions/upload-task-image-action'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MAX_IMAGE_SIZE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUploadTaskImageStore } from '@/store/upload-task-image-store'
import { TaskWithRelations } from '@/types'
import { CloudUpload, Loader2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

type Props = {
  task: TaskWithRelations
  nextVersion: number
}

export default function UploadTaskImageDialog({ task, nextVersion }: Props) {
  const { isOpen, setOpen } = useUploadTaskImageStore()
  const [, setCurrentVersion] = useQueryState(
    'version',
    parseAsInteger.withOptions({ shallow: true }),
  )

  const { execute, status } = useAction(uploadTaskImageAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
    onSuccess: ({ data }) => {
      toast.success('Image uploaded successfully')
      setOpen(false)
      setCurrentVersion(data?.version || nextVersion - 1)
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length !== 1) {
        return toast.error('Please select only one image')
      }

      const file = acceptedFiles[0]
      if (file.size > MAX_IMAGE_SIZE * 1024 * 1024 * 1024) {
        return toast.error(`File size exceeds ${MAX_IMAGE_SIZE}GB limit`)
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('taskId', task.id)
      formData.append('workspaceId', task.workspace.id)
      formData.append('projectId', task.project.id)
      formData.append('version', nextVersion.toString())
      formData.append('clientId', task.project.client)

      execute(formData)
    },
    [execute, task, nextVersion],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: { 'image/*': [] },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
        </DialogHeader>

        {status === 'executing' ? (
          <div className='flex items-center justify-center rounded-lg border p-16'>
            <Loader2 className='size-6 animate-spin' />
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'flex items-center justify-center rounded-lg border border-dashed p-16 transition-all hover:cursor-pointer hover:border-primary/25 hover:bg-muted/50',
              isDragActive ? 'border-primary' : 'border-border',
            )}
          >
            <input {...getInputProps()} />
            <div className='flex flex-col items-center'>
              <CloudUpload className='mb-2 size-9' />
              <p>
                Drag and drop or{' '}
                <span className='text-primary'>select files</span>
              </p>
              <p className='text-sm text-muted-foreground'>
                Max file size: {MAX_IMAGE_SIZE}GB
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
