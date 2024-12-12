import ProjectNavbar from '@/components/navbars/project-navbar'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProject } from '@/queries'
import { notFound } from 'next/navigation'

type Props = {
  children: React.ReactNode
  params: Promise<{ domain: string; projectId: string }>
}

export default async function ProjectLayout({ children, params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const project = await getProject(supabase, domain, projectId)

  if (!project) return notFound()

  return (
    <div className='flex size-full flex-col p-6'>
      <ProjectNavbar projectId={projectId} projectName={project.name} />
      {children}
    </div>
  )
}
