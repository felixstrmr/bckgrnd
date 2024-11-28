import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import Bckgrnd from '@/components/icons/bckgrnd'
import Github from '@/components/icons/github'
import Twitter from '@/components/icons/twitter'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { env } from '@/lib/env'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='fixed left-0 right-0 top-4 z-50 mx-auto mt-4 flex w-full max-w-6xl items-center justify-between gap-2 rounded-2xl border bg-secondary/50 p-2 backdrop-blur-md sm:gap-0'>
      <div className='flex w-full items-center justify-start space-x-4 sm:w-auto'>
        <Link href={'/'}>
          <Bckgrnd className='size-9 shadow-sm' />
        </Link>
        <Separator orientation='vertical' className='hidden h-9 sm:block' />
        <div className='flex items-center'>
          <Link
            href={'https://link.bckgrnd.one/x'}
            passHref
            target='_blank'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'sm:size-default group text-muted-foreground',
            )}
          >
            <Twitter className='size-4 fill-muted-foreground transition-colors group-hover:fill-primary' />
            <span className='hidden sm:inline'>Twitter</span>
          </Link>

          <Link
            href={'https://link.bckgrnd.one/github'}
            passHref
            target='_blank'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'sm:size-default group text-muted-foreground',
            )}
          >
            <Github className='size-4 fill-muted-foreground transition-colors group-hover:fill-primary' />
            <span className='hidden sm:inline'>Github</span>
          </Link>
        </div>
      </div>
      <div className='flex w-full items-center justify-center space-x-2 sm:w-auto'>
        <Link
          href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'hidden w-full sm:block',
          )}
        >
          Login
        </Link>
        <JoinWaitlistButton size='default' className='w-full sm:w-auto' />
      </div>
    </div>
  )
}
