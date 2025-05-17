import ProjectsSidebar from '@/components/projects-sidebar'
import { getDomain } from '@/lib/utils'
import { getProject } from '@/queries/cached'
import { notFound } from 'next/navigation'

type Props = {
  children: React.ReactNode
  params: Promise<{ workspace: string; projectId: string }>
}

export default async function ProjectLayout({ children, params }: Props) {
  const { workspace, projectId } = await params
  const domain = getDomain(workspace)

  const project = await getProject(domain, projectId)

  if (!project) {
    return notFound()
  }

  return (
    <div className='flex size-full'>
      <ProjectsSidebar project={project} />
      {children}
    </div>
  )
}
