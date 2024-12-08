import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
type Props = {
  className?: string
}

export default function TaskCommentSkeleton({ className }: Props) {
  return (
    <div className={cn('pr-4 pt-4', className)}>
      <div className='flex flex-col space-y-6'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='flex gap-2'>
            <Skeleton className='size-9 rounded-full' />
            <div className='flex-1'>
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-16' />
              </div>
              <div className='mt-2'>
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='mt-1 h-4 w-1/2' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
