'use client'

import { useTaskVersion } from '@/hooks/use-task-version'
import { TaskImage } from '@/types'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useRef, useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)
  const [scale, setScale] = useState(1)

  const { selectedImage } = useTaskVersion(taskImages)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * -0.01
      const newScale = Math.min(Math.max(scale + delta, 0.1), 4)
      setScale(newScale)
    },
    [scale],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true)
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        })
      }
    },
    [position],
  )

  return (
    <div className='relative size-full'>
      <div
        ref={containerRef}
        className='size-full overflow-hidden rounded-lg border bg-muted p-4'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        tabIndex={0}
      >
        {selectedImage ? (
          <div
            className='flex size-full cursor-grab items-center justify-center active:cursor-grabbing'
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.1s',
            }}
          >
            {isLoading && (
              <Loader2 className='absolute size-8 animate-spin text-muted-foreground' />
            )}
            <Image
              src={`/api/proxy?filePath=files/${selectedImage.image_path}`}
              width={1920}
              height={1080}
              className='h-auto max-h-full w-auto max-w-full select-none rounded-sm border object-contain'
              unoptimized
              alt='Task Image'
              draggable={false}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          <div className='flex size-full flex-col items-center justify-center gap-1 text-muted-foreground'>
            <p className='text-sm'>No images uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
