import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { env } from '@/lib/env'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
      <div className='flex items-center'>
        <Link href={'/'}>
          <Bckgrnd className='size-9' />
        </Link>
        <Separator className='mx-4 h-9' orientation='vertical' />
        <div className='flex items-center gap-4 text-sm'>
          <Link
            href={'https://x.com/bckgrndapp'}
            passHref
            className='text-muted-foreground transition-all hover:text-foreground'
          >
            Twitter
          </Link>
          <Link
            href={'https://github.com/felixstrmr/bckgrnd'}
            passHref
            className='text-muted-foreground transition-all hover:text-foreground'
          >
            Github
          </Link>
        </div>
      </div>
      <div className='flex space-x-2'>
        <Link
          href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`}
          className={buttonVariants({ variant: 'outline' })}
        >
          Login
        </Link>
      </div>
    </div>
  )
}
