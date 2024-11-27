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

const CURRENT_YEAR = new Date().getFullYear()

const FEATURE_CARDS = [
  {
    title: 'Productivity',
    description:
      'Create projects, manage clients and track your progress with tasks.',
    icon: Briefcase,
    image: '/web/hero-card-productivity.svg',
    width: 738.66,
    colSpan: 4,
    imageClassName: 'ml-6',
  },
  {
    title: 'Collaboration',
    description: 'Receive feedback and manage approvals.',
    icon: Handshake,
    image: '/web/hero-card-collaboration.svg',
    width: 373,
    colSpan: 2,
  },
  {
    title: 'File Storage',
    description: 'Store, organize and share your files.',
    icon: Archive,
    image: '/web/hero-card-file-storage.svg',
    width: 373,
    colSpan: 2,
  },
  {
    title: 'Version Control',
    description: 'Share designs and revert to previous versions.',
    icon: History,
    image: '/web/hero-card-version-control.svg',
    width: 738.66,
    colSpan: 4,
    imageClassName: 'ml-6',
  },
]

export default function Page() {
  const appUrl = `${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`

  return (
    <section className='w-full pb-20'>
      <div className='relative h-full w-screen sm:h-screen'>
        <div className='bg-fill bg-fill absolute -z-50 size-full bg-[url(https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/bg.webp)] bg-center' />

        <div className='relative z-10'>
          <div className='mx-auto w-full max-w-6xl px-4 pt-36 md:px-6 md:pt-48'>
            <div className='flex flex-col items-center text-center'>
              <Link
                href='/'
                className='flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground md:text-base'
              >
                How Bckgrnd solves your problems
                <CheckCircle className='size-4' />
              </Link>

              <h1 className='mt-6 max-w-4xl text-4xl leading-tight md:mt-9 md:text-6xl md:leading-[1.1]'>
                Organize, Share, and Track Your Design Work in One Place.
              </h1>

              <p className='mt-4 max-w-2xl text-lg text-foreground/60 md:mt-6 md:text-2xl'>
                Bckgrnd helps designers manage projects, files, list tasks,
                collaborate with clients, and deliver work.
              </p>

              <div className='mt-8 flex w-full flex-col-reverse gap-2 px-4 md:mt-12 md:flex-row md:justify-center md:space-x-2 md:px-0'>
                <Link
                  href={appUrl}
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
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
                    <div className='absolute z-10 size-2.5 animate-ping rounded-full bg-green-600' />
                    <div className='relative size-2.5 rounded-full bg-green-600' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative mx-auto mt-16 aspect-video max-w-7xl px-4 md:mt-36 md:px-0'>
          <div className='absolute bottom-0 left-0 h-3/4 w-full bg-gradient-to-b from-transparent to-background' />

          <Image
            className='z-40 aspect-video translate-y-3 rounded-t-md bg-secondary shadow-2xl md:rounded-t-2xl'
            alt='hero image'
            width={1920}
            height={1080}
            src='https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp'
          />

          <div className='absolute left-0 top-0 -z-50 h-full w-[40%] bg-gradient-to-b from-[#B79891] to-[#B79891] opacity-80 blur-[100px]' />
          <div className='absolute right-0 top-0 -z-50 h-full w-[40%] bg-gradient-to-b from-[#B79891] to-[#B79891] opacity-80 blur-[100px]' />
        </div>
      </div>

      <div className='absolute z-40 w-full bg-background'>
        <div className='mx-auto w-full max-w-6xl px-4 md:px-6'>
          <div className='flex flex-col items-center py-20 md:py-36'>
            <p className='text-center text-xl text-muted-foreground'>
              Trusted by designers working with
            </p>
            <div className='mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3'>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className='h-9 w-full rounded-md bg-muted' />
              ))}
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
              your own agency, Bckgrnd is designed to improve the way you work.
            </p>

            <div className='mt-12 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-6'>
              {FEATURE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className={cn(
                    'flex flex-col justify-between overflow-hidden rounded-2xl bg-muted',
                    card.colSpan && `md:col-span-${card.colSpan}`,
                    card.colSpan === 4 && 'md:h-80',
                  )}
                >
                  <div className='p-6'>
                    <div className='flex items-center space-x-2'>
                      <card.icon className='size-4 text-muted-foreground' />
                      <h5>{card.title}</h5>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {card.description}
                    </p>
                  </div>
                  <Image
                    src={`https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public${card.image}`}
                    alt={card.title.toLowerCase()}
                    width={card.width}
                    height={224}
                    className={card.imageClassName}
                  />
                </div>
              ))}
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
                href='mailto:support@bckgrnd.co'
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
                href='mailto:support@bckgrnd.one'
                className='text-sm text-muted-foreground hover:text-foreground'
              >
                Contact
              </Link>
            </div>
            <p className='text-sm text-muted-foreground'>
              © {CURRENT_YEAR} Bckgrnd. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </section>
  )
}
