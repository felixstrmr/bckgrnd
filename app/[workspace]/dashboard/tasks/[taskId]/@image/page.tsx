import TaskImageCreateDialog from '@/components/dialogs/task-image-create-dialog'
import TaskImageCanvas from '@/components/task-image-canvas'
import { buttonVariants } from '@/components/ui/button'
import { getDomain } from '@/lib/utils'
import { getLatestTaskImage, getTask } from '@/queries/cached'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ workspace: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { workspace, taskId } = await params
  const domain = getDomain(workspace)

  const [task, taskImage] = await Promise.all([
    getTask(domain, taskId),
    getLatestTaskImage(domain, taskId),
  ])

  if (!task) {
    return notFound()
  }

  return (
    <div className='flex size-full flex-col'>
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-4'>
          <Link
            href={`/dashboard/projects/${task.project}`}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <ChevronLeft />
          </Link>
          <h1 className='text-xl font-semibold tracking-tight'>{task.name}</h1>
        </div>
        <TaskImageCreateDialog />
      </div>
      <div className='flex-1 p-4'>
        <TaskImageCanvas taskImage={taskImage} />
      </div>
    </div>
  )
}
