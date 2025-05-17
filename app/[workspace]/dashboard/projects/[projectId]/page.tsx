import { getDomain } from '@/lib/utils'
import { getProject } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ workspace: string; projectId: string }>
}

export default async function Page({ params }: Props) {
  const { workspace, projectId } = await params
  const domain = getDomain(workspace)

  const project = await getProject(domain, projectId)

  if (!project) {
    return notFound()
  }

  return <div>Page</div>
}
