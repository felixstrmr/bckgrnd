import DashboardSidebar from '@/components/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <DashboardSidebar />
      {children}
    </div>
  )
}
