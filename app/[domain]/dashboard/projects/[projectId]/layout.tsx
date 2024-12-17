import ProjectSidebar from '@/components/sidebars/project-sidebar'
import { createClient } from '@/lib/clients/supabase/server'
import { getDomain } from '@/lib/utils'
import { getProjectWithRelations } from '@/queries/project'

type Props = {
  children: React.ReactNode
  params: Promise<{ domain: string; projectId: string }>
}

export default async function ProjectLayout({ children, params }: Props) {
  const { domain: domainParam, projectId } = await params
  const domain = getDomain(domainParam)

  const supabase = await createClient()
  const project = await getProjectWithRelations(supabase, domain, projectId)

  return (
    <div className='flex size-full overflow-hidden'>
      <ProjectSidebar project={project} />
      {children}
    </div>
  )
}
