import DashboardSidebar from '@/components/dashboard-sidebar'
import DashboardSidebarSkeleton from '@/components/skeletons/dashboard-sidebar-skeleton'
import { getDomain } from '@/lib/utils'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ workspace: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { workspace } = await params
  const domain = getDomain(workspace)

  return (
    <div className='flex size-full'>
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar domain={domain} />
      </Suspense>
      {children}
    </div>
  )
}
