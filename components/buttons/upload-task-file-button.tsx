'use client'

import { uploadTaskFileAction } from '@/actions/upload-task-file-action'
import { Button } from '@/components/ui/button'
import { MAX_TASK_FILE_SIZE } from '@/lib/constants'
import { TaskWithRelations } from '@/queries/task'
import { Upload } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  domain: string
  latestVersion: number
  task: TaskWithRelations
  workspaceId: string
}

export default function UploadTaskFileButton({
  domain,
  latestVersion,
  task,
  workspaceId,
}: Props) {
  const toastId = 'upload-task-file'
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const { execute, status } = useAction(uploadTaskFileAction, {
    onError: ({ error }) => {
      toast.error(error.serverError, { id: toastId })
    },
    onExecute: () => {
      toast.loading('Uploading file...', { id: toastId })
    },
    onSuccess: () => {
      toast.success('File successfully uploaded!', { id: toastId })
    },
  })
  const loading = status === 'executing'

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

    execute({
      taskId: task.id,
      file,
      domain,
      workspaceId,
      clientId: task.client?.id,
      projectId: task.project?.id,
      latestVersion: latestVersion ?? 0,
    })
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        className='hidden'
        onChange={handleFileChange}
        disabled={loading}
      />
      <Button onClick={handleButtonClick} disabled={loading}>
        <Upload className='h-4 w-4' />
        Upload
      </Button>
    </>
  )
}
