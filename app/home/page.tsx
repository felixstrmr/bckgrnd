import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import WordRotate from '@/components/ui/word-rotate'
import { env } from '@/lib/env'
import { cn } from '@/lib/utils'
import {
  Archive,
  Briefcase,
  CheckCircle,
  Handshake,
  History,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <section className='min-h-screen w-full pb-20'>
      <div className='pt-36 md:pt-48'>
        <div className='mx-auto w-full max-w-6xl px-4 md:px-6'>
          <header>
            <Link
              href={'/'}
              className='flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground md:text-base'
            >
              How Bckgrnd solves your problems
              <CheckCircle className='size-4' />
            </Link>

            <div>
              <h1 className='mt-6 max-w-2xl text-4xl text-muted-foreground md:mt-9 md:text-6xl'>
                Your creative work deserves{' '}
                <span className='text-primary'>a better workflow.</span>
              </h1>
            </div>

            <p className='mt-4 max-w-2xl text-lg font-medium text-muted-foreground md:mt-6 md:text-xl'>
              Bckgrnd is the all-in-one platform where creatives manage
              projects, collaborate with clients, and deliver exceptional work.
            </p>
          </header>

          <div className='mt-8 flex flex-col gap-2 md:mt-12 md:flex-row md:items-center md:space-x-2'>
            <Link
              href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                }),
                'h-12 w-full rounded-xl text-base md:w-auto',
              )}
            >
              Login
            </Link>
            <div className='relative w-full md:w-auto'>
              <JoinWaitlistButton
                size='lg'
                className='h-12 w-full rounded-xl text-base md:w-auto'
              />
              <div className='absolute -right-0.5 -top-0.5 flex'>
                <div className='absolute z-10 size-2.5 animate-ping rounded-full bg-green-600'></div>
                <div className='relative size-2.5 rounded-full bg-green-600' />
              </div>
            </div>
          </div>

          <p className='mt-4 text-sm text-muted-foreground'>
            Free during beta • 24.99€/mo at launch
          </p>
        </div>

        <div className='relative mx-auto mt-20 aspect-video max-w-7xl px-4 md:mt-36 md:px-6'>
          <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#00000000] to-[#00000030]' />
          <Image
            className='z-40 aspect-video rounded-t-2xl bg-secondary shadow-lg'
            alt='hero image'
            width={1920}
            height={1080}
            src={
              'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp'
            }
          />
          <div className='absolute left-0 top-0 -z-50 h-full w-[40%] bg-gradient-to-b from-[#B79891] to-[#B79891] opacity-80 blur-[150px]' />
          <div className='absolute right-0 top-0 -z-50 h-full w-[40%] bg-gradient-to-b from-[#B79891] to-[#B79891] opacity-80 blur-[150px]' />
        </div>
        <div className='absolute z-40 -mt-[4.5rem] w-full bg-background'>
          <div className='mx-auto w-full max-w-6xl px-4 md:px-6'>
            <div className='flex flex-col items-center py-20 md:py-36'>
              <p className='text-center text-muted-foreground'>
                Trusted by designers working with
              </p>
              <div className='mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3'>
                <Skeleton className='h-9 w-full rounded-md bg-muted' />
                <Skeleton className='h-9 w-full rounded-md bg-muted' />
                <Skeleton className='h-9 w-full rounded-md bg-muted' />
              </div>
            </div>
            <div className='py-20 md:py-36'>
              <h2 className='text-center text-muted-foreground md:text-left'>
                Built for{' '}
                <WordRotate
                  className='inline-flex text-3xl text-foreground md:text-4xl'
                  words={['Designers', 'Agencies', 'Freelancers', 'Startups']}
                />
              </h2>
              <p className='mt-3 max-w-xl text-center text-base text-muted-foreground md:text-left md:text-lg'>
                Whether you&apos;re a solo designer, part of a team, or running
                your own agency, Bckgrnd is designed to improve the way you
                work.
              </p>

              <div className='mt-12 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-6'>
                <div className='flex flex-col justify-between overflow-hidden rounded-2xl bg-muted md:col-span-4 md:h-80'>
                  <div className='p-6'>
                    <div className='flex items-center space-x-2'>
                      <Briefcase className='size-4 text-muted-foreground' />
                      <h5>Productivity</h5>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Create projects, manage clients and track your progress
                      with tasks.
                    </p>
                  </div>
                  <Image
                    className='ml-6'
                    src={
                      'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-card-productivity.svg'
                    }
                    alt='productivity'
                    width={738.66}
                    height={224}
                  />
                </div>

                <div className='flex flex-col justify-between overflow-hidden rounded-2xl bg-muted md:col-span-2'>
                  <div className='p-6'>
                    <div className='flex items-center space-x-2'>
                      <Handshake className='size-4 text-muted-foreground' />
                      <h5>Collaboration</h5>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Receive feedback and manage approvals.
                    </p>
                  </div>
                  <Image
                    src={
                      'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-card-collaboration.svg'
                    }
                    alt='collaboration'
                    width={373}
                    height={224}
                  />
                </div>

                <div className='flex flex-col justify-between overflow-hidden rounded-2xl bg-muted md:col-span-2'>
                  <div className='p-6'>
                    <div className='flex items-center space-x-2'>
                      <Archive className='size-4 text-muted-foreground' />
                      <h5>File Storage</h5>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Store, organize and share your files.
                    </p>
                  </div>
                  <Image
                    src={
                      'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-card-file-storage.svg'
                    }
                    alt='collaboration'
                    width={373}
                    height={224}
                  />
                </div>

                <div className='flex flex-col justify-between overflow-hidden rounded-2xl bg-muted md:col-span-4'>
                  <div className='p-6'>
                    <div className='flex items-center space-x-2'>
                      <History className='size-4 text-muted-foreground' />
                      <h5>Version Control</h5>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Share designs and revert to previous versions.
                    </p>
                  </div>
                  <Image
                    src={
                      'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-card-version-control.svg'
                    }
                    alt='version control'
                    className='ml-6'
                    width={738.66}
                    height={224}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center rounded-2xl bg-primary px-4 py-16 text-center md:py-24'>
              <h2 className='max-w-xl text-3xl text-primary-foreground md:text-5xl'>
                See how Bckgrnd transforms creative work!
              </h2>
              <p className='mt-3 text-base text-[#737373] md:text-lg'>
                Early access and exclusive benefits for waitlist members
              </p>
              <div className='mt-8 flex w-full flex-col items-center gap-2 md:mt-12 md:flex-row md:justify-center'>
                <Link
                  href={'mailto:support@bckgrnd.co'}
                  passHref
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 w-full bg-transparent text-primary-foreground md:w-auto',
                  )}
                >
                  Contact us
                </Link>
                <JoinWaitlistButton
                  size='lg'
                  className='h-12 w-full rounded-xl bg-background text-base text-primary hover:bg-background/80 md:w-auto'
                />
              </div>
            </div>

            <footer className='mt-12 flex flex-col space-y-4 border-t py-6 md:mt-16 md:flex-row md:items-center md:justify-between md:space-y-0'>
              <div className='flex flex-col space-y-2 md:flex-row md:items-center md:gap-4 md:space-y-0'>
                <Link
                  href='/privacy'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Terms of Service
                </Link>
                <Link
                  href={'mailto:support@bckgrnd.one'}
                  passHref
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Contact
                </Link>
              </div>
              <p className='text-sm text-muted-foreground'>
                © {new Date().getFullYear()} Bckgrnd. All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
