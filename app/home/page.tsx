import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { Palette } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col rounded-lg border bg-background shadow-md'>
      <div className='mx-auto flex size-full max-w-6xl flex-col items-center border-l border-r px-6 pb-24 pt-24'>
        <Link
          href={'https://link.bckgrnd.one/x'}
          passHref
          target='_blank'
          className='w-fit rounded-full bg-muted px-3 py-0.5 text-muted-foreground transition-all hover:text-foreground'
        >
          Follow us on X for updates!
        </Link>
        <h1 className='mt-6 max-w-2xl text-center'>
          Streamline your{' '}
          <Palette className='inline-block size-12' strokeWidth={2.5} /> design
          workflow with ease.
        </h1>
        <p className='mt-4 max-w-lg text-center text-xl text-muted-foreground'>
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
      <div className='mx-auto flex w-fit max-w-6xl border-t'>
        <div className='flex size-full border-l border-r px-6 pt-6'>
          <Image
            src={
              'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp?t=2024-11-17T19%3A56%3A44.032ZF'
            }
            alt='Hero image'
            className='rounded-lg shadow-lg'
            width={1280}
            height={720}
          />
        </div>
      </div>
    </div>
  )
}
