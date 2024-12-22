import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='flex size-full overflow-hidden bg-muted'>
      <DashboardSidebar />
      <div className='size-full flex-1 overflow-hidden p-2 pl-0'>
        <div className='size-full rounded-md border bg-background shadow-sm'>
          {children}
        </div>
      </div>
    </div>
  )
}
