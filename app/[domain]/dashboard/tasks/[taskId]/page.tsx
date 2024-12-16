import UploadTaskFileButton from '@/components/buttons/upload-task-file-button'
import TaskFileVersionSelect from '@/components/selects/task-file-version-select'
import TaskSidebar from '@/components/sidebars/task-sidebar'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import TaskCanvas from '@/components/views/task/task-canvas'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getTask, getTaskFileVersions } from '@/queries'
import { getUserWithCache } from '@/queries/cached'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
  searchParams: Promise<{
    tab: string | undefined
    version: string | undefined
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = getDomain(domainParam)
  const { tab, version } = await searchParams

  const supabase = await createClient()
  const [task, user, fileVersions] = await Promise.all([
    getTask(supabase, domain, taskId),
    getUserWithCache(supabase),
    getTaskFileVersions(supabase, domain, taskId),
  ])

  return (
    <div className='flex size-full flex-col'>
      <header className='flex w-full justify-between border-b p-4'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/dashboard/tasks`}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <ArrowLeft className='size-4' />
          </Link>
          <Separator orientation='vertical' className='h-4' />
          <h4>{task.name}</h4>
          <TaskFileVersionSelect taskFileVersions={fileVersions} />
        </div>
        <div className='flex items-center gap-2'>
          <UploadTaskFileButton
            task={task}
            domain={domain}
            latestVersion={fileVersions[0]?.version}
          />
        </div>
      </header>
      <div className='flex size-full'>
        <TaskSidebar task={task} userId={user.id} tab={tab} />
        <TaskCanvas
          taskId={task.id}
          domain={domain}
          taskFileVersions={fileVersions}
          version={version}
        />
      </div>
    </div>
  )
}
