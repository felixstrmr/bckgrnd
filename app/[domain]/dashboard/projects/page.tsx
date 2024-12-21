import { Badge } from '@/components/ui/badge'

export default function Page() {
  return (
    <div className=''>
      <div className='flex w-full justify-between p-6'>
        <div className='space-y-1'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-semibold tracking-tight'>Projects</h1>
            <Badge variant='secondary'>0</Badge>
          </div>
          <p className='text-muted-foreground'>
            Manage your projects and associated tasks.
          </p>
        </div>
      </div>
    </div>
  )
}
