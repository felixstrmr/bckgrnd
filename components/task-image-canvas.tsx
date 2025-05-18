'use client'

import { TaskImage } from '@/types'

type Props = {
  taskImage: TaskImage | null
}

export default function TaskImageCanvas({ taskImage }: Props) {
  return (
    <div className='flex size-full rounded-lg border'>
      <pre>{JSON.stringify(taskImage, null, 2)}</pre>
    </div>
  )
}
