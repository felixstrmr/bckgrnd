import UploadTaskImageDialog from '@/components/dialogs/upload-task-image-dialog'
import DynamicIcon from '@/components/dynamic-icon'
import { buttonVariants } from '@/components/ui/button'
import TaskImageCanvas from '@/components/views/task/task-image-canvas'
import TaskImageVersions from '@/components/views/task/task-image-versions'
import TaskUsers from '@/components/views/task/task-users'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { reduceOpacity } from '@/lib/utils/reduce-opacity'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    domain: string
    taskId: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const [taskResult, taskImagesResult, taskUsersResult] = await Promise.all([
    supabase
      .from('tasks')
      .select(
        '*, workspace:workspaces(domain), status:task_statuses(name, color, icon)',
      )
      .eq('workspace.domain', domain)
      .eq('id', params.taskId)
      .single(),

    supabase
      .from('task_images')
      .select('*, workspace:workspaces(domain)')
      .eq('workspace.domain', domain)
      .eq('task', params.taskId)
      .order('version', { ascending: false }),

    supabase
      .from('task_users')
      .select('*, user:users(*)')
      .eq('task', params.taskId),
  ])

  if (taskResult.error || taskImagesResult.error || taskUsersResult.error) {
    console.error('Error fetching task data:', {
      taskError: taskResult.error,
      taskImagesError: taskImagesResult.error,
      taskUsersError: taskUsersResult.error,
    })
    return <div>Error fetching task data</div>
  }

  const task = taskResult.data
  const taskImages = taskImagesResult.data
  const taskUsers = taskUsersResult.data

  const bgColor = reduceOpacity(task.status.color, 10)
  const bordercolor = reduceOpacity(task.status.color, 10)

  const defaultVersion = taskImages.reduce(function (prev, current) {
    return prev && prev.version > current.version ? prev : current
  })

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href={`/projects/${task.project}/tasks`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='size-4' />
          </Link>
          <h3>{task.name}</h3>
          <div
            className='flex items-center space-x-2 rounded-full border px-1 py-0.5 pr-2'
            style={{
              color: task.status.color,
              backgroundColor: bgColor,
              borderColor: bordercolor,
            }}
          >
            <DynamicIcon icon={task.status.icon} />
            <span className='text-sm'>{task.status.name}</span>
          </div>
        </div>
        <TaskUsers taskUsers={taskUsers} />
      </div>
      <div className='flex size-full space-x-4'>
        <TaskImageVersions
          taskImages={taskImages}
          defaultVersion={defaultVersion?.version}
        />
        <TaskImageCanvas
          taskImages={taskImages}
          defaultVersion={defaultVersion?.version}
        />
      </div>
      <UploadTaskImageDialog />
    </div>
  )
}
