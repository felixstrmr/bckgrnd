'use client'

import { uploadTaskFileAction } from '@/actions/upload-task-file-action'
import CloudUpload from '@/components/icons/outline/cloud-upload'
import { Button } from '@/components/ui/button'
import { MAX_TASK_FILE_SIZE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  taskId: string
  workspaceId: string
}

export default function UploadTaskFileButton({ taskId, workspaceId }: Props) {
  const ref = React.useRef<HTMLInputElement>(null)

  const toastId = 'upload-task-file'

  const { execute, status } = useAction(uploadTaskFileAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, { id: toastId })
    },
    onExecute: () => {
      toast.loading('Uploading file...', { id: toastId })
    },
    onSuccess: () => {
      toast.success('File uploaded successfully!', { id: toastId })
    },
  })
  const loading = status === 'executing'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > MAX_TASK_FILE_SIZE) {
      toast.error(
        `File size must be less than ${MAX_TASK_FILE_SIZE / (1024 * 1024)}MB`,
        {
          id: toastId,
        },
      )
      return
    }

    execute({ file, taskId, workspaceId })
  }

  const handleButtonClick = () => {
    ref.current?.click()
  }

  return (
    <>
      <input
        ref={ref}
        type='file'
        className='hidden'
        onChange={handleFileChange}
        disabled={loading}
      />
      <Button onClick={handleButtonClick} loading={loading}>
        <CloudUpload className={cn('h-4 w-4', loading && 'hidden')} />
        Upload
      </Button>
    </>
  )
}
