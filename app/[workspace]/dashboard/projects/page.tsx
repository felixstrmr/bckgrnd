import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Projects</h1>
        <Link
          href={'/dashboard/projects/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create project
        </Link>
      </div>
    </div>
  )
}
