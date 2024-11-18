'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  error: Error
}

export default function Error({ error }: Props) {
  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <h1 className='text-destructive/50'>ERROR</h1>
      <h3 className='mt-2'>Oh no, something went wrong!</h3>
      <p className='mb-6 mt-2 text-muted-foreground'>
        Error message: {error.message}
      </p>
      <div className='flex gap-2'>
        <Link
          href={'mailto:support@bckgrnd.one'}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Report
        </Link>
        <Link href={'/'} className={buttonVariants({ variant: 'ghost' })}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
