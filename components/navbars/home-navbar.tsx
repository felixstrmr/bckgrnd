import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import Bckgrnd from '@/components/icons/bckgrnd'
import Github from '@/components/icons/github'
import Twitter from '@/components/icons/twitter'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { env } from '@/lib/env'
import Link from 'next/link'

export default function HomeNavbar() {
  return (
    <div className='fixed left-0 right-0 top-0 z-50 mx-auto mt-4 flex w-full max-w-6xl items-center justify-between rounded-2xl border bg-background/50 p-2 backdrop-blur-md'>
      <div className='flex items-center space-x-4'>
        <Link href={'/'}>
          <Bckgrnd className='size-9 shadow-sm' />
        </Link>
        <Separator orientation='vertical' className='h-9' />
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Link
              href={'https://link.bckgrnd.one/x'}
              passHref
              target='_blank'
              className={buttonVariants({ variant: 'secondary' })}
            >
              <Twitter className='size-4 dark:invert' />
              Twitter
            </Link>
            <div className='absolute -right-0.5 -top-0.5 flex'>
              <div className='absolute z-10 size-2 animate-ping rounded-full bg-green-600'></div>
              <div className='relative size-2 rounded-full bg-green-600' />
            </div>
          </div>
          <Link
            href={'https://link.bckgrnd.one/github'}
            passHref
            target='_blank'
            className={buttonVariants({ variant: 'ghost' })}
          >
            <Github className='size-4 dark:invert' />
            Github
          </Link>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <Link
          href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Login
        </Link>
        <JoinWaitlistButton size='default' />
      </div>
    </div>
  )
}
