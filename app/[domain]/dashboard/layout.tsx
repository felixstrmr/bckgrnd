import WorkspaceSidebar from '@/components/sidebars/workspace-sidebar'
import { cookies } from 'next/headers'

type Props = {
  children: React.ReactNode
}

export default async function WorkspaceLayout({ children }: Props) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <div className='flex size-full bg-muted'>
      <WorkspaceSidebar defaultOpen={defaultOpen} />
      <div className='flex size-full overflow-hidden p-2 pl-0'>
        <div className='flex size-full rounded-2xl border bg-background shadow'>
          {children}
        </div>
      </div>
    </div>
  )
}
