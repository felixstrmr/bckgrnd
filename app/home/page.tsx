import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { Palette } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col rounded-lg border bg-background shadow-md'>
      <div className='mx-auto flex w-full max-w-6xl flex-col border-l border-r px-6 pt-24'>
        <Link
          href={'https://x.com/bckgrndapp'}
          passHref
          className='w-fit rounded-full bg-muted px-3 py-0.5 text-muted-foreground transition-all hover:text-foreground'
        >
          Follow us on X for updates!
        </Link>
        <h1 className='mt-6 max-w-2xl'>
          Streamline your{' '}
          <Palette className='inline-block size-12' strokeWidth={2.5} /> design
          workflow with ease.
        </h1>
        <p className='mt-4 max-w-lg text-xl text-muted-foreground'>
          Enhance your efficiency and delight clients with seamless
          collaboration and project management features.
        </p>
        <div className='mt-6 flex items-center gap-2'>
          <Link
            href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Login
          </Link>
          <JoinWaitlistButton size='lg' />
        </div>
      </div>
      <div className='mx-auto mt-32 flex w-fit rounded-3xl border p-2'></div>
    </div>
  )
}
