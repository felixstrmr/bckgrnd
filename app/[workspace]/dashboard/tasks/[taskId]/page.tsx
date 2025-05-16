import { getDomain } from '@/lib/utils'
import { getTask } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ workspace: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { workspace, taskId } = await params
  const domain = getDomain(workspace)

  const task = await getTask(domain, taskId)

  if (!task) {
    return notFound()
  }

  return <div>{task.name}</div>
}
