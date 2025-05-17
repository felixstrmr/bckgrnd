import { getDomain } from '@/lib/utils'
import { getLatestTaskImage } from '@/queries/cached'

type Props = {
  params: Promise<{ workspace: string; taskId: string }>
}

export default async function Page({ params }: Props) {
  const { workspace, taskId } = await params
  const domain = getDomain(workspace)

  const taskImage = await getLatestTaskImage(domain, taskId)

  if (!taskImage) {
    return <>upload</>
  }

  return <div></div>
}
