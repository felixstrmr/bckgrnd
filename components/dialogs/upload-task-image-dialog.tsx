'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MAX_IMAGE_SIZE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useUploadTaskImageStore } from '@/store/upload-task-image-store'
import { CloudUpload, Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export default function UploadTaskImageDialog() {
  const { isOpen, setOpen } = useUploadTaskImageStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    toast.success(JSON.stringify(acceptedFiles[0].name))
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ maxFiles: 1, onDrop })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
        </DialogHeader>

        {acceptedFiles.length > 0 ? (
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
                Drag and drop or <span>select files</span>
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
