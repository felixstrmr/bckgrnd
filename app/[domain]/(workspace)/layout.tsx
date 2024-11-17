import WorkspaceSidebar from '@/components/sidebars/workspace-sidebar'

type Props = {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: Props) {
  return (
    <div className='flex size-full overflow-hidden bg-muted'>
      <WorkspaceSidebar />
      <div className='flex size-full overflow-hidden py-2 pr-2'>
        <div className='size-full overflow-hidden rounded-lg bg-background shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}
