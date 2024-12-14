'use client'

import { TaskFileWithRelations } from '@/types/custom'
import { File } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  taskFile: TaskFileWithRelations | null
}

export default function TaskFileCanvas({ taskFile }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position],
  )

  const handleMouseMove = React.useCallback(
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

  const handleTouchStart = React.useCallback(
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
    <div className='relative size-full rounded-lg border'>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        tabIndex={0}
        className='size-full overflow-hidden p-4'
      >
        {taskFile ? (
          <div
            className='flex size-full cursor-grab items-center justify-center active:cursor-grabbing'
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <Image
              unoptimized
              src={`/api/image?path=/files/${taskFile.file?.path}`}
              alt={taskFile.file?.name ?? 'Task File'}
              width={1920}
              height={1080}
              className='rounded-md border shadow-sm'
              draggable={false}
            />
          </div>
        ) : (
          <div className='flex size-full flex-col items-center justify-center gap-2'>
            <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
              <File className='size-8 text-muted-foreground' />
            </div>
            <p className='text-muted-foreground'>No Versions uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
