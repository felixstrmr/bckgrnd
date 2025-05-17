import DashboardSidebarDropdown from '@/components/dashboard-sidebar-dropdown'
import DashboardSidebarNavigation from '@/components/dashboard-sidebar-navigation'
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
    <aside className='bg-muted flex flex-col gap-4 border-r p-4'>
      <DashboardSidebarDropdown workspaceUser={workspaceUser} />
      <DashboardSidebarNavigation />
    </aside>
  )
}
