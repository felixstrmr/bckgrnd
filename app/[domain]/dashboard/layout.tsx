import WorkspaceSidebar from '@/components/sidebars/workspace-sidebar'

type Props = {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: Props) {
  return (
    <div className='flex size-full bg-muted'>
      <WorkspaceSidebar />
      <div className='flex size-full p-2 pl-0'>
        <div className='flex size-full rounded-2xl border bg-background shadow'>
          {children}
        </div>
      </div>
    </div>
  )
}
