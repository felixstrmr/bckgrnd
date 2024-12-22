'use client'

import { Button } from '@/components/ui/button'
import { TaskFile } from '@/components/views/task/task-file-canvas-wrapper'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  taskFile: TaskFile
}

export default function TaskFileCanvas({ taskFile }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(1)

  const imageUrl = `/api/image?path=/files${taskFile?.file.path}`
  const isResetable = position.x !== 0 || position.y !== 0 || scale !== 1

  React.useEffect(() => {
    handleReset()
  }, [taskFile?.file.path])

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

  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const delta = e.deltaY * -0.01
      handleZoom(delta)
    }
  }, [])

  const handleReset = () => {
    setPosition({ x: 0, y: 0 })
    setScale(1)
  }

  return (
    <div className='relative size-full'>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
        tabIndex={0}
        className='size-full overflow-hidden p-4'
      >
        <div className='absolute left-2 top-2 z-10 flex flex-col gap-1'>
          <Button variant='outline' size='icon' onClick={() => handleZoom(0.1)}>
            <Plus className='size-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={() => handleZoom(-0.1)}
          >
            <Minus className='size-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={handleReset}
            disabled={!isResetable}
          >
            <RotateCcw className='size-4' />
          </Button>
        </div>

        {taskFile && (
          <div
            className='flex size-full cursor-grab items-center justify-center active:cursor-grabbing'
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <Image
              unoptimized
              src={imageUrl}
              alt={taskFile.id}
              width={taskFile.file.image_width ?? 1920}
              height={taskFile.file.image_height ?? 1080}
              draggable={false}
              className='rounded-sm border'
            />
          </div>
        )}
      </div>
    </div>
  )
}
