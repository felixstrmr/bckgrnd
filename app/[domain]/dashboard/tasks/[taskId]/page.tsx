import UploadTaskFileButton from '@/components/buttons/upload-task-file-button'
import TaskFileVersionSelect from '@/components/selects/task-file-version-select'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TaskComments from '@/components/views/task/task-comments'
import TaskFileCanvas from '@/components/views/task/task-file-canvas'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import {
  getLastTaskFile,
  getTask,
  getTaskFile,
  getTaskFileVersions,
} from '@/queries'
import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { ArrowLeft, History } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
  searchParams: Promise<{ version: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = getDomain(domainParam)

  const { version } = await searchParams

  const supabase = await createClient()
  const [task, taskFile, taskFileVersions] = await Promise.all([
    getTask(supabase, domain, taskId),
    getTaskFileDynamic(supabase, domain, taskId, version),
    getTaskFileVersions(supabase, domain, taskId),
  ])

  if (!task) return notFound()

  const lastVersion = taskFileVersions[0]?.version ?? 0

  return (
    <div className='flex size-full flex-col space-y-6 overflow-hidden p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href={
              task.project
                ? `/dashboard/projects/${task.project.id}/tasks`
                : `/dashboard/tasks`
            }
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <ArrowLeft className='size-4' />
          </Link>
          <Separator orientation='vertical' className='h-6' />
          <h4>{task.name}</h4>
          {taskFile ? (
            <TaskFileVersionSelect taskFileVersions={taskFileVersions} />
          ) : (
            <div className='flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground'>
              <History className='size-3' />
              No Versions
            </div>
          )}
        </div>
        <UploadTaskFileButton
          task={task}
          domain={domain}
          workspaceId={task.workspace.id}
          clientId={task.project?.client}
          projectId={task.project?.id}
          latestVersion={lastVersion}
        />
      </div>
      <div className='flex size-full min-h-0 flex-1 gap-4'>
        <TaskFileCanvas taskFile={taskFile} />
        <TaskComments task={task} />
      </div>
    </div>
  )
}

function getTaskFileDynamic(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
  taskFileId: string | null,
) {
  if (!taskFileId) return getLastTaskFile(supabase, domain, taskId)

  return getTaskFile(supabase, domain, taskId, taskFileId)
}
