import WorkspaceSidebar from '@/components/sidebars/workspace-sidebar'

type Props = {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <WorkspaceSidebar />
      {children}
    </div>
  )
}
