import JoinWaitlistForm from '@/components/forms/join-waitlist-form'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='mx-auto size-full max-w-5xl'>
      <div className='flex flex-col items-center text-center'>
        <Link
          href={'https://x.com/bckgrndapp'}
          passHref
          className='mb-4 flex items-center gap-2 rounded-full bg-muted p-1 pr-4 text-muted-foreground transition-colors hover:text-foreground'
        >
          <span className='rounded-full bg-primary/10 px-2 py-1 text-xs'>
            NEW
          </span>
          Follow us on X for updates!
        </Link>
        <h1 className='max-w-2xl'>
          Streamline your design workflow with ease.
        </h1>
        <p className='mt-6 max-w-xl text-xl text-muted-foreground'>
          Enhance your efficiency and delight clients with bckgrnd&apos;s
          seamless collaboration and project management features.
        </p>
        <JoinWaitlistForm className='mt-8' />
      </div>
    </div>
  )
}
