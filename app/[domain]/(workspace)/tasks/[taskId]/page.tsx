import RevalidateTagButton from '@/components/buttons/revalidate-button'
import UploadTaskImageButton from '@/components/buttons/upload-task-image-button'
import TaskImageShareDropdown from '@/components/dropdowns/task-image-share-dropdown'
import TaskImageVersionSelect from '@/components/selects/task-image-version-select'
import TaskSidebar from '@/components/sidebars/task-sidebar'
import { buttonVariants } from '@/components/ui/button'
import TaskImageCanvas from '@/components/views/task/task-image-canvas'
import { getTaskImages } from '@/lib/queries'
import {
  getTaskWithCache,
  getUserWithCache,
  getWorkspaceWithCache,
} from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { formatRelativeTime, getDomain } from '@/lib/utils'
import { TaskImage } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ domain: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { domain: domainParam, taskId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const [task, taskImages, workspace, user] = await Promise.all([
    getTaskWithCache(supabase, domain, taskId),
    getTaskImages(supabase, domain, taskId),
    getWorkspaceWithCache(supabase, domain),
    getUserWithCache(supabase, domain),
  ])

  if (taskImages.error) {
    console.error(taskImages.error)
    throw taskImages.error
  }

  if (!task) return notFound()

  const latestImage =
    taskImages.data.length > 0
      ? taskImages.data.reduce((prev, current) =>
          prev.version > current.version ? prev : current,
        )
      : null

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex flex-shrink-0 justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/projects/${task.project.id}/tasks`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ArrowLeft className='size-4' />
          </Link>
          <h3 className='whitespace-nowrap'>{task.name}</h3>
          {taskImages.data.length > 0 ? (
            <TaskImageVersionSelect taskImages={taskImages.data} />
          ) : (
            <div className='rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>
              No Versions
            </div>
          )}
          {task.updated_at ? (
            <p className='whitespace-nowrap text-sm text-muted-foreground'>
              Updated {formatRelativeTime(new Date(task.updated_at))}
            </p>
          ) : (
            <p className='whitespace-nowrap text-sm text-muted-foreground'>
              Created {formatRelativeTime(new Date(task.created_at))}
            </p>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <RevalidateTagButton tag={`task-${domain}-${taskId}`} />
          <TaskImageShareDropdown taskImages={taskImages.data} />
          <UploadTaskImageButton
            domain={domain}
            workspaceId={workspace.id}
            taskId={task.id}
            clientId={task.project.client}
            projectId={task.project.id}
            latestImage={latestImage || ({} as TaskImage)}
          />
        </div>
      </div>
      <div className='flex min-h-0 flex-1 gap-4'>
        <TaskImageCanvas
          taskImages={taskImages.data}
          taskId={taskId}
          domain={domain}
        />
        <TaskSidebar
          projectId={task.project.id}
          domain={domain}
          taskId={taskId}
          workspaceId={workspace.id}
          taskImages={taskImages.data}
          user={user}
        />
      </div>
    </div>
  )
}
