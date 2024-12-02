'use client'

import { shareTaskImageAction } from '@/actions/share-task-image-action'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTaskVersion } from '@/hooks/use-task-version'
import { TaskImage } from '@/types'
import { Share } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

type Props = {
  taskImages: TaskImage[]
}

export default function TaskImageShareDropdown({ taskImages }: Props) {
  const { selectedImage } = useTaskVersion(taskImages)

  const { execute } = useAction(shareTaskImageAction, {
    onError: ({ error }) => {
      toast.dismiss()
      toast.error(error.serverError)
    },
    onExecute: () => {
      toast.loading('Generating link...')
    },
    onSuccess: ({ data }) => {
      toast.dismiss()
      toast.success('Copied to clipboard')
      navigator.clipboard.writeText(data || '')
    },
  })

  const handleShareClick = (expiresIn: string) => {
    execute({
      path: selectedImage.image_path,
      expiresIn: expiresIn as '1 week' | '1 month' | '1 year',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Share className='size-4' />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Image URL</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {['1 week', '1 month', '1 year'].map((duration) => (
                <DropdownMenuItem
                  key={duration}
                  onClick={() => handleShareClick(duration)}
                >
                  Expire in {duration}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
