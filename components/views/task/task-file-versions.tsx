import { createClient } from '@/lib/clients/supabase/server'
import { getTaskFiles } from '@/queries/task-file'
import { format } from 'date-fns'
import { Trash } from 'lucide-react'

type Props = {
  taskId: string
  domain: string
}

export default async function TaskFileVersions({ taskId, domain }: Props) {
  const supabase = await createClient()

  const taskFiles = await getTaskFiles(supabase, domain, taskId)

  return (
    <div className='flex flex-col gap-4 p-4'>
      <p className='text-xs'>Versions</p>
      <div className='flex flex-col gap-2'>
        {taskFiles.map((file) => (
          <div
            key={file.id}
            className='flex items-center justify-between rounded-md border p-2 pr-4'
          >
            <div>
              <p>Version {file.version}</p>
              <p className='text-xs text-muted-foreground'>
                {format(file.created_at, 'PP')}
              </p>
            </div>
            <Trash className='size-4 text-destructive' />
          </div>
        ))}
      </div>
    </div>
  )
}
