import UploadTaskFileButton from '@/components/buttons/upload-task-file-button'
import ArrowLeft from '@/components/icons/outline/arrow-left'
import TaskFileVersionSelect from '@/components/selects/task-file-version-select'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/clients/supabase/server'
import { cn, extractDomain } from '@/lib/utils'
import { getTask } from '@/queries/task'
import { getTaskFileVersions } from '@/queries/task-file'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = extractDomain(domainParam)

  const supabase = await createClient()
  const [task, versions] = await Promise.all([
    getTask(supabase, domain, taskId),
    getTaskFileVersions(supabase, domain, taskId),
  ])

  return (
    <div className='flex w-full items-center justify-between border-b p-4'>
      <div className='flex items-center gap-4'>
        <Link
          href={'/dashboard/tasks'}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'min-w-8',
          )}
        >
          <ArrowLeft />
        </Link>
        <Separator orientation='vertical' className='h-6' />
        <div className='flex flex-col gap-1'>
          <h1 className='whitespace-nowrap text-2xl font-semibold'>
            {task.name}
          </h1>
        </div>
        <TaskFileVersionSelect taskFileVersions={versions} />
      </div>
      <UploadTaskFileButton taskId={taskId} workspaceId={task.workspace.id} />
    </div>
  )
}
