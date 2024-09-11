'use client'

import { TaskImage } from '@/types'
import { useRef } from 'react'

type Props = {
  taskImages: TaskImage[]
  defaultVersion: number | undefined
}

export default function TaskImageCanvas({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className='size-full rounded-lg border p-4'>
      <canvas ref={canvasRef} />
    </div>
  )
}
