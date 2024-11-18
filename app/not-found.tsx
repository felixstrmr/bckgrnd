import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <h1 className='text-muted-foreground/50'>404</h1>
      <h3 className='mb-4 mt-2'>Oh no, this page doesn&apos;t exist!</h3>
      <Link href={'/'} className={buttonVariants({ variant: 'secondary' })}>
        Back to Home
      </Link>
    </div>
  )
}
