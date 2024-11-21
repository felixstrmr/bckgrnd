import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import WordRotate from '@/components/ui/word-rotate'
import { env } from '@/lib/env'
import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='mx-auto w-full max-w-6xl px-4 pt-48 sm:px-6 sm:pt-48 xl:px-0'>
      <div className='flex w-full flex-col space-y-8 lg:flex-row lg:space-x-3 lg:space-y-0'>
        <div className='flex w-full flex-col items-center justify-center text-center lg:items-start lg:text-left'>
          <h1 className='max-w-lg whitespace-pre-wrap text-5xl'>
            Streamline your design workflow with ease.
          </h1>
          <p className='mt-3 max-w-md text-lg text-muted-foreground'>
            Create, collaborate, and ship your designs faster with our powerful
            design-workflow tool.
          </p>
          <div className='mt-6 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
            <Link
              href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              Login
            </Link>
            <JoinWaitlistButton size='lg' />
          </div>
        </div>
        <div className='flex w-full items-center justify-center px-6'>
          <Image
            src={
              'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-graphic.svg'
            }
            className='hidden h-auto w-full max-w-xl drop-shadow-sm lg:block'
            alt='Hero graphic'
            width={6478.997}
            height={120}
          />
        </div>
      </div>

      <div className='relative mt-16 flex justify-center sm:mt-24'>
        <Image
          src='https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image2.webp'
          alt='Hero image'
          priority
          width={1280}
          height={720}
          className='w-full rounded-sm shadow-xl'
        />
        <div className='absolute -top-3 -z-10 mx-auto aspect-video w-full max-w-[1080px] rounded-sm bg-muted/65 shadow-sm' />
        <div className='absolute -top-6 -z-20 mx-auto aspect-video w-full max-w-[980px] rounded-sm bg-muted/35 shadow-sm' />
      </div>

      <div className='mt-16 flex flex-col items-center justify-center sm:mt-24'>
        <p className='text-center text-muted-foreground'>
          Trusted by designers working with
        </p>
        <div className='mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3'>
          <Skeleton className='h-9 w-full rounded-md bg-muted' />
          <Skeleton className='h-9 w-full rounded-md bg-muted' />
          <Skeleton className='h-9 w-full rounded-md bg-muted' />
        </div>
      </div>

      <div className='mt-16 sm:mt-24'>
        <div className='flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
          <h2>Built for</h2>
          <WordRotate
            className='text-3xl font-semibold tracking-tight sm:text-4xl'
            words={['Designers', 'Agencies', 'Freelancers', 'Startups']}
          />
        </div>
        <p className='mt-3 max-w-xl text-center text-lg text-muted-foreground sm:text-left'>
          Whether you&apos;re a solo designer, part of a team, or running your
          own agency, Bckgrnd is designed to improve the way you work.
        </p>

        <div className='mt-9 rounded-2xl bg-muted p-4 sm:p-6'>
          <h4 className='text-lg font-medium'>Streamlined Collaboration</h4>
          <p className='mt-2 text-muted-foreground'>
            Share designs, collect feedback, and manage client approvals all in
            one place. No more scattered emails and messages.
          </p>
          <div className='mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Real-time feedback</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Version control</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Client approvals</span>
            </div>
          </div>
        </div>

        <div className='mt-6 rounded-2xl bg-muted p-4 sm:p-6'>
          <h4 className='text-lg font-medium'>File Organization</h4>
          <p className='mt-2 text-muted-foreground'>
            Keep all your design files organized and accessible. Share files
            securely with clients and track versions effortlessly.
          </p>
          <div className='mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Secure storage</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Easy sharing</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Version history</span>
            </div>
          </div>
        </div>

        <div className='mt-6 rounded-2xl bg-muted p-4 sm:p-6'>
          <h4 className='text-lg font-medium'>Client Management</h4>
          <p className='mt-2 text-muted-foreground'>
            Manage your clients and their projects efficiently. Keep track of
            communications, deadlines, and deliverables in one central place.
          </p>
          <div className='mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Contact info</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Project history</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='h-4 w-4 text-primary' />
              <span className='text-sm'>Communication logs</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-16 flex w-full flex-col items-center justify-center rounded-2xl bg-foreground p-6 py-12 sm:mt-24 sm:p-12 sm:py-24'>
        <Bckgrnd className='size-12 invert' />
        <h2 className='mt-4 text-center text-background'>
          Ready to elevate your design workflow?
        </h2>
        <p className='mt-2 text-center text-lg text-muted-foreground sm:text-xl'>
          Join the waitlist to get early access to Bckgrnd.
        </p>
        <div className='mt-8 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0'>
          <Link
            href={'mailto:support@bckgrnd.co'}
            passHref
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'dark',
            )}
          >
            Contact us
          </Link>
          <JoinWaitlistButton size='lg' className='dark' />
        </div>
      </div>

      <footer className='mt-16 flex flex-col space-y-4 border-t py-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
        <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0'>
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
  )
}
