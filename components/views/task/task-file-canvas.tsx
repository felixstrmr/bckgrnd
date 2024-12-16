'use client'

import { Button } from '@/components/ui/button'
import { TaskFileWithRelations } from '@/types/custom'
import { Minus, Plus, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  taskFile: TaskFileWithRelations
}

export default function TaskFileCanvas({ taskFile }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(1)
  const [imageError, setImageError] = React.useState(false)
  const [retryCount, setRetryCount] = React.useState(0)
  const maxRetries = 3

  const imageUrl = `/api/image?path=/files/${taskFile.file.path}&t=${retryCount}`

  React.useEffect(() => {
    handleReset()
  }, [taskFile.file.path])

  const handleImageError = () => {
    setImageError(true)
    if (retryCount < maxRetries) {
      const timeout = Math.pow(2, retryCount) * 1000
      setTimeout(() => {
        setRetryCount((prev) => prev + 1)
        setImageError(false)
      }, timeout)
    }
  }

  const handleRetryManually = () => {
    setRetryCount((prev) => prev + 1)
    setImageError(false)
  }

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(0.1, prev + delta), 3))
  }

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      setDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    },
    [position],
  )

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return

      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    },
    [dragging, dragStart],
  )

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleMouseLeave = () => {
    setDragging(false)
  }

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        setDragging(true)
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        })
      }
    },
    [position],
  )

  const isResetable = position.x !== 0 || position.y !== 0 || scale !== 1

  const handleReset = () => {
    setPosition({ x: 0, y: 0 })
    setScale(1)
  }

  return (
    <div className='relative size-full bg-muted/75'>
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
        <div className='absolute left-2 top-2 z-10 flex flex-col gap-1'>
          <Button
            variant='outline'
            size='icon-sm'
            onClick={() => handleZoom(0.1)}
          >
            <Plus className='size-4' />
          </Button>
          <Button
            variant='outline'
            size='icon-sm'
            onClick={() => handleZoom(-0.1)}
          >
            <Minus className='size-4' />
          </Button>
          <Button
            variant='outline'
            size='icon-sm'
            onClick={handleReset}
            disabled={!isResetable}
          >
            <RefreshCcw className='size-4' />
          </Button>
        </div>

        {taskFile && (
          <div
            className='flex size-full cursor-grab items-center justify-center active:cursor-grabbing'
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            {imageError && retryCount >= maxRetries ? (
              <div className='flex flex-col items-center gap-2 text-center'>
                <p className='text-sm text-muted-foreground'>
                  Failed to load image
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleRetryManually}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <Image
                unoptimized
                src={imageUrl}
                alt={taskFile.file.name}
                width={1080}
                height={1080}
                draggable={false}
                priority
                className='rounded-sm border'
                onError={handleImageError}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
