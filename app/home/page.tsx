import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import HeroImages from '@/components/hero-images'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Archive, Briefcase, Handshake, History } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='relative flex size-full flex-col'>
      {/* Glare Effect */}
      <svg
        viewBox='0 0 1920 1280'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='pointer-events-none absolute size-full mix-blend-plus-lighter'
        preserveAspectRatio='xMidYMid slice'
      >
        <g clipPath='url(#clip0_556_2)'>
          <g className='mix-blend-plus-lighter' filter='url(#filter0_f_556_2)'>
            <ellipse
              cx='549.825'
              cy='98.6907'
              rx='64.4564'
              ry='445.549'
              transform='rotate(-37.766 549.825 98.6907)'
              fill='#D88527'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_f_556_2'
            x='152.688'
            y='-375.262'
            width='794.275'
            height='947.904'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feGaussianBlur
              stdDeviation='59.75'
              result='effect1_foregroundBlur_556_2'
            />
          </filter>
          <clipPath id='clip0_556_2'>
            <rect width='1920' height='1080' fill='white' />
          </clipPath>
        </defs>
      </svg>

      {/* Hero */}
      <div className='flex size-full min-h-screen flex-col p-2 lg:p-4'>
        <div className='size-full rounded-2xl bg-gradient-to-b from-muted to-background pt-16'>
          <div className='mx-auto flex w-full max-w-5xl flex-col items-center pt-16 text-center'>
            <h1 className='gradient-text pb-2 text-4xl font-semibold tracking-tight md:max-w-2xl md:text-6xl'>
              The All-in-One Platform for Managing Your Design Projects.
            </h1>
            <p className='mt-2 max-w-md text-base text-muted-foreground md:mt-4 md:max-w-2xl md:text-xl'>
              Bckgrnd helps designers manage projects, files, list tasks,
              collaborate with clients, and deliver work{' '}
              <span className='font-semibold'>
                without the bother of being on multiple apps.
              </span>
            </p>
            <div className='z-40 mt-8'>
              <JoinWaitlistForm />
            </div>
          </div>
          <div className='relative mt-24'>
            <HeroImages />
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col items-center pt-32'>
          <p className='text-lg text-muted-foreground'>
            Trusted by designers working with
          </p>
          <div className='mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 px-2 md:grid-cols-3'>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className='h-9 w-full rounded-md bg-muted' />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col items-center pt-48'>
          <h2 className='gradient-text pb-2 text-3xl tracking-tight md:text-5xl'>
            Focus on what matters.{' '}
            <span className='font-semibold'>Creating.</span>
          </h2>
          <p className='mt-2 text-muted-foreground'>
            Stop juggling tools. Start delivering exceptional design work.
          </p>
          <div className='mt-12 grid grid-cols-1 gap-4 px-4 md:mt-16 md:grid-cols-6 md:px-0'>
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
                className='ml-6 invert'
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
                className='invert'
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
                className='invert'
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
                className='ml-6 invert'
                src={
                  'https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-card-version-control.svg'
                }
                alt='version control'
                width={738.66}
                height={224}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col pt-48'>
          <h2 className='gradient-text pb-2 text-3xl tracking-tight md:text-5xl'>
            How Bckgrnd works
          </h2>
          <p className='text-muted-foreground'>
            Simple, streamlined, and designed for creative professionals
          </p>
        </div>
        <div className='mt-12 grid grid-cols-3'>
          <div>
            <h3 className='mb-4 text-4xl font-semibold text-muted-foreground'>
              01
            </h3>
            <p className='text-xl font-semibold tracking-tight'>
              Create your workspace
            </p>
            <p className='text-muted-foreground'>
              Setup your account and organize your design projects in one place.
            </p>
          </div>
          <div>
            <h3 className='mb-4 text-4xl font-semibold text-muted-foreground'>
              02
            </h3>
            <p className='text-xl font-semibold tracking-tight'>
              Invite your team & clients
            </p>
            <p className='text-muted-foreground'>
              Collaborate seamlessly with stakeholders in a unified environment.
            </p>
          </div>
          <div>
            <h3 className='mb-4 text-4xl font-semibold text-muted-foreground'>
              03
            </h3>
            <p className='text-xl font-semibold tracking-tight'>
              Deliver great work
            </p>
            <p className='text-muted-foreground'>
              Manage tasks, share files, and track progress all in one platform.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col items-center pt-48'>
          <h2 className='gradient-text pb-2 text-3xl tracking-tight md:text-5xl'>
            Frequently Asked Questions
          </h2>
          <Accordion
            type='single'
            collapsible
            className='mt-12 w-full max-w-3xl space-y-2'
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger className='rounded-md px-4 font-semibold hover:bg-muted hover:no-underline'>
                What is Bckgrnd?
              </AccordionTrigger>
              <AccordionContent className='p-4'>
                Bckgrnd is an all-in-one platform designed specifically for
                designers to manage projects, collaborate with clients and
                deliver work efficiently.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='rounded-md px-4 font-semibold hover:bg-muted hover:no-underline'>
                How is Bckgrnd different from other tools?
              </AccordionTrigger>
              <AccordionContent className='p-4'>
                Unlike other platforms, Bckgrnd combines project management,
                file sharing, and client collaboration in one seamless
                interface, eliminating the need for multiple tools.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger className='rounded-md px-4 font-semibold hover:bg-muted hover:no-underline'>
                When will Bckgrnd be available?
              </AccordionTrigger>
              <AccordionContent className='p-4'>
                We&apos;re currently in private beta. Join our waitlist to be
                notified when we launch and get early access to the platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* CTA */}
      <div className='mx-auto flex w-full max-w-5xl flex-col pt-48'>
        <div className='flex flex-col items-center rounded-2xl bg-muted p-12 py-24'>
          <h2 className='gradient-text pb-2 text-3xl tracking-tight md:text-5xl'>
            Ready to get started?
          </h2>
          <p className='text-muted-foreground'>
            Join our waitlist to be notified when we launch and get early access
            to the platform.
          </p>
          <div className='mt-8'>
            <JoinWaitlistForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col items-center pb-4 pt-16 md:flex-row md:justify-between'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Bckgrnd. All rights reserved.
            </p>
          </div>
          <div className='mt-4 flex space-x-6 md:mt-0'>
            <Link
              href='https://link.bckgrnd.one/x'
              className='text-sm text-muted-foreground hover:text-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </Link>
            <Link
              href='https://link.bckgrnd.one/github'
              className='text-sm text-muted-foreground hover:text-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </Link>
            <Link
              href='https://linkedin.com/company/bckgrnd'
              className='text-sm text-muted-foreground hover:text-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
