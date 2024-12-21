import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import Bckgrnd from '@/components/icons/bckgrnd'
import HeroImages from '@/components/landing/hero-images'
import HowItWorks from '@/components/landing/how-it-works'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Brush,
  Clock,
  FileStack,
  MessageSquare,
  Users2,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Design System Management',
    description:
      'Maintain consistency across projects with integrated design system tools.',
    icon: (
      <Brush className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
  {
    title: 'Asset Organization',
    description:
      'Smart file management with tagging and instant search capabilities.',
    icon: (
      <FileStack className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
  {
    title: 'Client Collaboration',
    description:
      'Real-time feedback, approvals, and communication all in one place.',
    icon: (
      <Users2 className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
  {
    title: 'Lightning Fast Workflow',
    description:
      'Automated tasks and shortcuts that speed up your design process.',
    icon: (
      <Zap className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
  {
    title: 'Integrated Chat',
    description: 'Built-in messaging system for seamless team communication.',
    icon: (
      <MessageSquare className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
  {
    title: 'Time Tracking',
    description:
      'Monitor project hours and deadlines with smart time management tools.',
    icon: (
      <Clock className='size-4 text-muted-foreground transition-all group-hover:text-primary-foreground' />
    ),
  },
]

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
      <div className='mx-auto flex w-full max-w-5xl flex-col pt-32'>
        <div className='flex flex-col items-center'>
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
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4 pt-32 md:pt-64'>
        <div className='flex flex-col items-center'>
          <Badge variant={'outline'} className='mb-4'>
            Features
          </Badge>
          <h2 className='gradient-text max-w-2xl pb-2 text-center text-3xl font-semibold tracking-tight md:text-5xl'>
            Focus on what matters. Creating.
          </h2>
          <p className='mt-2 max-w-2xl text-center text-lg text-muted-foreground'>
            Stop juggling tools. Start delivering exceptional design work
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className='mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, i) => (
            <div
              key={i}
              className='group rounded-md border border-transparent bg-muted/50 p-8 transition-all hover:border-border'
            >
              <div className='relative'>
                <div className='mb-4 flex size-8 items-center justify-center rounded-md border bg-background bg-gradient-to-t group-hover:border-primary group-hover:from-primary group-hover:to-[#49494E]'>
                  {feature.icon}
                </div>
                <h3 className='mb-2 text-xl font-semibold'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <HowItWorks />

      {/* Pricing section */}
      <div className='mx-auto flex w-full max-w-5xl flex-col pb-6 pt-32'>
        <div className='flex flex-col items-center rounded-2xl bg-muted py-32 text-primary/50'>
          <h3 className='text-center text-5xl tracking-tight md:text-9xl'>
            <span className='gradient-text font-semibold'>Free</span> while in
            beta
          </h3>
          <p className='mt-4 text-center text-2xl text-muted-foreground'>
            Early adopters get exclusive benefits and pricing when we launch
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='flex flex-col items-center rounded-2xl bg-muted py-32 text-primary/50'>
          <h2 className='gradient-text mb-6 max-w-md pb-2 text-center text-3xl tracking-tight md:text-6xl'>
            Ready to streamline your design workflow?
          </h2>
          <JoinWaitlistForm />
        </div>
      </div>

      {/* Footer */}
      <footer className='mt-16 border-t'>
        <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-6'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Bckgrnd />
              <span className='text-lg font-semibold'>Bckgrnd</span>
            </div>
            <Link
              href={'https://link.bckgrnd.one/x'}
              passHref
              target='_blank'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Twitter
            </Link>
            <Link
              href={'https://link.bckgrnd.one/github'}
              passHref
              target='_blank'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Github
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
