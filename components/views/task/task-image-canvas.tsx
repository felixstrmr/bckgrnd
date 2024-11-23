'use client'

import { useTaskVersion } from '@/hooks/use-task-version'
import { TaskImage } from '@/types'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

type Props = {
  taskImages: TaskImage[]
  taskId: string
  domain: string
}

export default function TaskImageCanvas({ taskImages }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { selectedImage } = useTaskVersion(taskImages)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className='relative size-full overflow-hidden rounded-lg bg-muted p-4'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {selectedImage ? (
        <div
          className='flex size-full cursor-grab items-center justify-center active:cursor-grabbing'
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s',
          }}
        >
          <Image
            src={selectedImage.image_url}
            width={1920}
            height={1080}
            className='h-auto max-h-full w-auto max-w-full select-none rounded-sm border object-contain'
            unoptimized
            alt='Task Image'
            draggable={false}
          />
        </div>
      ) : (
        <div className='flex size-full flex-col items-center justify-center gap-1 text-muted-foreground'>
          <p className='text-sm'>No images uploaded yet.</p>
        </div>
      )}
    </div>
  )
}
