import ProjectSidebar from '@/components/sidebars/project-sidebar'

type Props = {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}

export default async function ProjectLayout({ children, params }: Props) {
  const { projectId } = await params

  return (
    <div className='flex size-full'>
      <ProjectSidebar projectId={projectId} />
      {children}
    </div>
  )
}
