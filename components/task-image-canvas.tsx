'use client'

import { cn } from '@/lib/utils'
import { TaskImage } from '@/types'

type Props = {
  taskImage: TaskImage | null
}

export default function TaskImageCanvas({ taskImage }: Props) {
  return (
    <div
      className={cn(
        'flex size-full rounded-lg border',
        taskImage ? 'border-solid' : 'border-dashed',
      )}
    >
      <pre>{JSON.stringify(taskImage, null, 2)}</pre>
    </div>
  )
}
