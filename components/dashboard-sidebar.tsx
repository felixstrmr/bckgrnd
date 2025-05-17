import DashboardSidebarNavigation from '@/components/dashboard-sidebar-navigation'
import BckgrndIcon from '@/components/icons/bckgrnd-icon'
import { Separator } from '@/components/ui/separator'
import { getWorkspaceUser } from '@/queries/cached'
import Link from 'next/link'
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
    <aside className='bg-muted flex flex-col border-r p-4'>
      <Link href={'/dashboard'}>
        <BckgrndIcon />
      </Link>
      <Separator className='my-4' />
      <DashboardSidebarNavigation />
    </aside>
  )
}
