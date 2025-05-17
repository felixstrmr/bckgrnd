import { getDomain } from '@/lib/utils'
import { getTask } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  image: React.ReactNode
  params: Promise<{ workspace: string; taskId: string }>
}

export default async function TaskLayout({ image, params }: Props) {
  const { workspace, taskId } = await params
  const domain = getDomain(workspace)

  const task = await getTask(domain, taskId)

  if (!task) {
    return notFound()
  }

  if (task.type === 'image') {
    return image
  }

  return <p>not found</p>
}
