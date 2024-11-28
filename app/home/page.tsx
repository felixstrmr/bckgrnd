import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex size-full flex-col'>
      <div className='relative flex h-screen w-screen'>
        <div className='mx-auto h-full max-w-7xl border-x'>
          <div className='absolute inset-0 -z-50 bg-[url(https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/bg.webp)] bg-cover bg-center' />
          <div className='relative z-10 flex flex-col items-center justify-center text-center'>
            <div className='top-0 z-50 flex w-full justify-between border-b p-4'>
              <Link href={'/'}>
                <Bckgrnd className='size-9' />
              </Link>
              <div className='flex items-center space-x-2'>
                <Link
                  href={'/login'}
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Login
                </Link>
                <Link
                  href={'/signup'}
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Join Waitlist
                </Link>
              </div>
            </div>

            <h1 className='mt-32 max-w-3xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent'>
              Organize, Share, and Track Your Design Work in One Place.
            </h1>

            <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
              Bckgrnd helps designers manage projects, files, list tasks,
              collaborate with clients, and deliver work without the bother of
              being on multiple apps.
            </p>

            <div className='mt-12'>
              <JoinWaitlistForm />
            </div>

            <div className='relative mt-36 px-4'>
              <Image
                src='https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp'
                alt='hero image'
                width={1920}
                height={1080}
                priority
                className='rounded-2xl shadow-2xl'
              />
              <div className='absolute left-0 right-0 top-9 -z-40 h-3/4 bg-gradient-to-b from-[#B79891] to-[#B79891] opacity-75 blur-[125px]' />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-7xl'>123</div>
    </div>
  )
}
