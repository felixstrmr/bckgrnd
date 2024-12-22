import UploadTaskFileButton from '@/components/buttons/upload-task-file-button'
import ArrowLeft from '@/components/icons/outline/arrow-left'
import TaskFileVersionSelect from '@/components/selects/task-file-version-select'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/clients/supabase/server'
import { getTaskDataVersions } from '@/lib/queries'
import { cn, extractDomain } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = extractDomain(domainParam)

  const supabase = await createClient()
  const { data, error } = await getTaskDataVersions(supabase, domain, taskId)

  if (error || !data || !data.taskFileVersions) {
    return <div>Error loading task</div>
  }

  const { task, taskFileVersions } = data

  if (!task) return notFound()

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
        <TaskFileVersionSelect taskFileVersions={taskFileVersions} />
      </div>
      <UploadTaskFileButton taskId={taskId} workspaceId={task.workspace.id} />
    </div>
  )
}
