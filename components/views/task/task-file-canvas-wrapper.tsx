import TaskFileCanvas from '@/components/views/task/task-file-canvas'
import { createClient } from '@/lib/clients/supabase/server'
import { getLatestTaskFile, getTaskFile } from '@/lib/queries'
import { TaskFile } from '@/types'
import { File } from 'lucide-react'

type Props = {
  domain: string
  taskId: string
  version?: string
}

export default async function TaskFileCanvasWrapper({
  domain,
  taskId,
  version,
}: Props) {
  let taskFile: TaskFile | null = null
  const supabase = await createClient()

  if (version === undefined) {
    taskFile = await getLatestTaskFile(supabase, domain, taskId)
  } else if (version) {
    taskFile = await getTaskFile(supabase, domain, version)
  }

  if (!taskFile) {
    return (
      <div className='flex size-full flex-col items-center justify-center'>
        <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
          <File className='size-8 text-muted-foreground' />
        </div>
        <div className='mt-2 text-center'>
          <h3 className='text-lg font-semibold tracking-tight'>
            No files found.
          </h3>
          <p className='text-muted-foreground'>Upload a file to get started.</p>
        </div>
      </div>
    )
  }

  return <TaskFileCanvas taskFile={taskFile} />
}
