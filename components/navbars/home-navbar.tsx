import Bckgrnd from '@/components/icons/bckgrnd'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { env } from '@/lib/env'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='mx-auto flex w-full max-w-5xl items-center justify-between py-4'>
      <div className='flex items-center'>
        <Link href={'/'}>
          <Bckgrnd />
        </Link>
        <Separator className='mx-4 h-9' orientation='vertical' />
        <div>
          <Link
            href={'/'}
            className='text-muted-foreground transition-all hover:text-foreground'
          >
            Twitter
          </Link>
        </div>
      </div>
      <div className='flex space-x-2'>
        <Link
          href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`}
          passHref
          className={buttonVariants({ variant: 'outline' })}
        >
          Login
        </Link>
        <Button>Get Early Access</Button>
      </div>
    </div>
  )
}
