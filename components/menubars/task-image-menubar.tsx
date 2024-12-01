'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { createClient } from '@/lib/supabase/client'
import { TaskImage } from '@/types'
import { Download, Share } from 'lucide-react'

type Props = {
  handleReset: () => void
  selectedImage: TaskImage | null
  imageMoved: boolean
  className?: string
}

export default function TaskImageMenubar({
  handleReset,
  selectedImage,
  imageMoved,
  className,
}: Props) {
  const handleDownload = async () => {
    if (!selectedImage) return

    const supabase = await createClient()

    const { data, error } = await supabase.storage
      .from('files')
      .download(selectedImage.image_path)

    if (error) {
      console.error(error)
      throw error
    }

    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedImage.image_name
    a.click()
  }

  return (
    <Menubar className={className}>
      <MenubarMenu>
        <MenubarTrigger>Image</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Share className='mr-2 size-4 text-muted-foreground' />
            Share
          </MenubarItem>
          <MenubarItem onClick={handleDownload}>
            <Download className='mr-2 size-4 text-muted-foreground' />
            Download
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {imageMoved && (
        <button
          className='rounded-sm px-3 py-1 text-sm font-medium hover:bg-accent'
          onClick={handleReset}
        >
          Reset
        </button>
      )}
    </Menubar>
  )
}
