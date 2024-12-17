import TaskFileCanvas from '@/components/views/task/task-file-canvas'
import { createClient } from '@/lib/clients/supabase/server'
import { getTaskFileWithRelations } from '@/queries/task-file'
import { File } from 'lucide-react'

type Props = {
  domain: string
  version: string | undefined
  taskFileVersions: {
    workspace: { domain: string }
    version: number
    id: string
  }[]
}

export default async function TaskCanvas({
  domain,

  taskFileVersions,
  version,
}: Props) {
  const supabase = await createClient()

  if (!version && taskFileVersions.length === 0) {
    return (
      <div className='flex size-full flex-col items-center justify-center'>
        <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
          <File className='size-8 text-muted-foreground' />
        </div>
        <div className='mt-2 text-center'>
          <h5>No files found.</h5>
          <p className='text-muted-foreground'>Upload a file to get started.</p>
        </div>
      </div>
    )
  }

  const sortedTaskFileVersions = taskFileVersions.sort(
    (a, b) => b.version - a.version,
  )

  const taskFileVersion = version || sortedTaskFileVersions[0]?.id

  const taskFile = await getTaskFileWithRelations(
    supabase,
    domain,
    taskFileVersion,
  )

  return <TaskFileCanvas taskFile={taskFile} />
}
