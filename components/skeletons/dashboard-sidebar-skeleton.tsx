import { Loader } from 'lucide-react'

export default function DashboardSidebarSkeleton() {
  return (
    <div className='bg-muted flex w-[265px] max-w-[265px] min-w-[265px] items-center justify-center border-r'>
      <Loader className='size-4 animate-spin' />
    </div>
  )
}
