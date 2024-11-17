import RevalidateTagButton from '@/components/buttons/revalidate-button'
import TaskSidebar from '@/components/sidebars/task-sidebar'
import { buttonVariants } from '@/components/ui/button'
import TaskImageCanvas from '@/components/views/task/task-image-canvas'
import { getTaskImages } from '@/lib/queries'
import { getTaskWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
  searchParams: Promise<{ version: number }>
}

export default async function Page({ params, searchParams }: Props) {
  const { domain: domainParam, taskId } = await params
  const { version } = await searchParams
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [task, taskImages] = await Promise.all([
    getTaskWithCache(supabase, domain, taskId),
    getTaskImages(supabase, domain, taskId),
  ])

  if (taskImages.error) {
    console.error(taskImages.error)
    throw taskImages.error
  }

  if (!task) return notFound()

  const latestVersion =
    taskImages.data.length > 0
      ? taskImages.data.reduce(
          (prev, current) => Math.max(prev, current.version),
          0,
        )
      : 0

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/projects/${task.project}/tasks`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ArrowLeft className='size-4' />
          </Link>
          <h3>{task.name}</h3>
          <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
            V{version || latestVersion}
          </div>
        </div>
        <RevalidateTagButton tag={`task-${domain}-${taskId}`} />
      </div>
      <div className='flex size-full gap-4'>
        <TaskImageCanvas
          taskImages={taskImages.data}
          taskId={taskId}
          domain={domain}
        />
        <TaskSidebar />
      </div>
    </div>
  )
}
