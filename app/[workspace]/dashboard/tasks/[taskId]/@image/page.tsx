import TaskImageCanvas from '@/components/task-image-canvas'
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
    <div className='flex size-full flex-col gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <Link
          href={`/dashboard/projects/${task.project}`}
          className='text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm'
        >
          <ChevronLeft className='size-3.5' />
          Back
        </Link>
        <h1 className='text-xl font-semibold tracking-tight'>{task.name}</h1>
      </div>
      <TaskImageCanvas taskImage={taskImage} />
    </div>
  )
}
