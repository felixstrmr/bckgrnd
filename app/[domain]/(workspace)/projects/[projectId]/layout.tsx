import ProjectSidebar from '@/components/sidebars/project-sidebar'

type Props = {
  children: React.ReactNode
  params: {
    domain: string
    projectId: string
  }
}

export default function ProjectLayout({ children, params }: Props) {
  return (
    <div className='flex size-full'>
      <ProjectSidebar projectId={params.projectId} />
      {children}
    </div>
  )
}
