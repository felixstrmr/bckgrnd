import WorkspaceSidebar from '@/components/sidebars/workspace-sidebar'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/queries/users/get-current-user'

type Props = {
  children: React.ReactNode
}

export default async function WorkspaceLayout({ children }: Props) {
  const supabase = createClient()

  const user = await getCurrentUser(supabase)

  return (
    <div className='flex size-full bg-muted'>
      <WorkspaceSidebar user={user} />
      <div className='flex size-full p-2 pl-0'>
        <div className='size-full rounded-lg border bg-background shadow-md'>
          {children}
        </div>
      </div>
    </div>
  )
}
