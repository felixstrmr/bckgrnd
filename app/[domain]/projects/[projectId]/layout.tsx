import ProjectSidebar from '@/components/sidebars/project-sidebar'

type Props = {
  children: React.ReactNode
  params: {
    projectId: string
  }
}

export default function ProjectLayout({ children, params }: Props) {
  return (
    <div className='flex size-full overflow-x-hidden'>
      <ProjectSidebar projectId={params.projectId} />
      {children}
    </div>
  )
}
