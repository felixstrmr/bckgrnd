import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import Bckgrnd from '@/components/icons/bckgrnd'
import Github from '@/components/icons/github'
import Twitter from '@/components/icons/twitter'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import WordRotate from '@/components/ui/word-rotate'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
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

export default async function Page() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('waitlist_counters')
    .select('count')
    .single()

  if (error) {
    console.error(error)
  }

  return (
    <div className='flex size-full flex-col'>
      {/* Navbar */}
      <div className='fixed left-0 right-0 top-0 z-40 mx-auto flex w-full max-w-6xl justify-between border-x border-b bg-background/75 p-4 backdrop-blur-md'>
        <div className='flex items-center gap-4'>
          <Link href={'/'}>
            <Bckgrnd className='size-9' />
          </Link>
          <Separator orientation='vertical' className='h-7' />
          <div className='flex items-center gap-4'>
            <Link
              href={'https://link.bckgrnd.one/x'}
              passHref
              target='_blank'
              className='group flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground'
            >
              <Twitter className='hidden size-4 fill-muted-foreground transition-all group-hover:fill-foreground md:block' />
              Twitter
            </Link>
            <Link
              href={'https://link.bckgrnd.one/github'}
              passHref
              target='_blank'
              className='group flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-foreground'
            >
              <Github className='hidden size-4 fill-muted-foreground transition-all group-hover:fill-foreground md:block' />
              Github
            </Link>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Link
            href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Login
          </Link>
          <Link
            href={'#hero'}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Join Waitlist
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className='relative mx-auto w-full max-w-6xl' id='hero'>
        <div className='absolute bottom-0 -z-10 h-1/2 w-full bg-gradient-to-t from-background to-transparent' />
        <div className='absolute -z-20 size-full w-full border-x' />
        <div
          rel='preconnect'
          className='absolute inset-0 -z-30 bg-[url(https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/bg.webp)] bg-cover bg-center'
        />

        <div className='relative z-10 mt-36 flex flex-col items-center px-4 text-center'>
          <Link
            href={'#features'}
            className='flex items-center gap-2 rounded-full border border-[#B79891] border-opacity-50 px-3 py-1 text-muted-foreground transition-all hover:text-foreground'
          >
            How Bckgrnd solves your problems
            <CheckCircle className='size-4' />
          </Link>
          <h1 className='mt-9 max-w-xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text pb-1 text-4xl text-transparent lg:max-w-4xl lg:text-6xl'>
            The All-in-One Platform for Managing Your Design Projects.
          </h1>

          <p className='mt-6 max-w-2xl text-xl text-muted-foreground'>
            Bckgrnd helps designers manage projects, files, list tasks,
            collaborate with clients, and deliver work without the bother of
            being on multiple apps.
          </p>

          <div className='mt-12' id='waitlist'>
            <JoinWaitlistForm />
            <p className='text-muted-foreground'>
              Join {data?.count}+ people on the waitlist.
            </p>
          </div>
        </div>

        <div className='relative mt-6 px-4 lg:mt-24'>
          <div className='absolute inset-0 bottom-0 z-10 w-full bg-gradient-to-t from-background to-transparent' />
          <div className='absolute inset-0 z-0 h-2/3 w-full bg-gradient-to-t from-background to-[#B79891] blur-[100px]' />
          <Image
            src={
              'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp'
            }
            alt='hero image'
            width={1120}
            height={630}
            className='relative aspect-video min-h-[630px] min-w-[1120px] rounded-2xl'
          />
        </div>
      </div>

      {/* Trusted by designers */}
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 md:py-32'>
        <p className='text-muted-foreground'>
          Trusted by designers working with
        </p>
        <div className='mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-9 w-full rounded-md bg-muted' />
          ))}
        </div>
      </div>

      {/* Features */}
      <div
        id='features'
        className='mx-auto flex w-full max-w-6xl flex-col px-4 py-20 md:py-32'
      >
        <h2 className='text-center text-3xl text-muted-foreground md:text-left md:text-4xl'>
          Built for{' '}
          <WordRotate
            className='inline-flex text-3xl text-foreground md:text-4xl'
            words={['Designers', 'Agencies', 'Freelancers', 'Startups']}
          />
        </h2>

        <p className='mt-3 max-w-xl text-center text-base text-muted-foreground md:text-left md:text-lg'>
          Whether you&apos;re a solo designer, part of a team, or running your
          own agency, Bckgrnd is designed to improve the way you work.
        </p>

        <div className='mt-12 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-6'>
          <div className='flex flex-col justify-between overflow-hidden rounded-2xl bg-muted md:col-span-4 md:h-80'>
            <div className='p-6'>
              <div className='flex items-center space-x-2'>
                <Briefcase className='size-4 text-muted-foreground' />
                <h5>Productivity</h5>
              </div>
              <p className='text-sm text-muted-foreground'>
                Create projects, manage clients and track your progress with
                tasks.
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

      {/* CTA */}
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center px-4'>
        <div className='flex w-full flex-col items-center rounded-2xl border bg-muted px-12 py-20 md:py-32'>
          <h2 className='text-center'>Save time and get more done.</h2>
          <p className='mt-2 text-center text-lg text-muted-foreground'>
            Early access and exclusive benefits for waitlist members.
          </p>
          <div className='mt-6 flex items-center gap-4'>
            <Link
              href='mailto:support@bckgrnd.one'
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
              )}
            >
              Contact us
            </Link>
            <Link
              href={'#hero'}
              className={buttonVariants({ variant: 'default', size: 'lg' })}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='mx-auto mt-12 flex w-full max-w-6xl flex-col space-y-4 border-t px-4 py-6 md:mt-16 md:flex-row md:items-center md:justify-between md:space-y-0'>
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
            href='mailto:support@bckgrnd.one'
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
  )
}
