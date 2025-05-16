import DashboardSidebarDropdown from '@/components/dashboard-sidebar-dropdown'
import DashboardSidebarNavigation from '@/components/dashboard-sidebar-navigation'
import { Separator } from '@/components/ui/separator'
import { getWorkspaceUser } from '@/queries/cached'
import { redirect } from 'next/navigation'

type Props = {
  domain: string
}

export default async function DashboardSidebar({ domain }: Props) {
  const workspaceUser = await getWorkspaceUser(domain)

  if (!workspaceUser) {
    return redirect(`/signin`)
  }

  return (
    <aside className='bg-muted flex w-64 max-w-64 min-w-64 flex-col border-r p-4'>
      <DashboardSidebarDropdown workspaceUser={workspaceUser} />
      <Separator className='my-4' />
      <DashboardSidebarNavigation />
    </aside>
  )
}
