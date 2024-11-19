import JoinWaitlistButton from '@/components/buttons/join-waitlist-button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { File, Handshake, Palette, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const features = [
    {
      icon: <Handshake className='size-6' />,
      title: 'Streamlined Collaboration',
      description:
        'Streamline communication and feedback in one centralized platform, eliminating scattered email threads.',
    },
    {
      icon: <File className='size-6' />,
      title: 'Version Control',
      description:
        'No more "final_v3_FINAL.psd". Keep track of design iterations and revisions with our intuitive version management.',
    },
    {
      icon: <Users className='size-6' />,
      title: 'Client Management',
      description:
        'Organize projects, manage client feedback, and maintain professional relationships all in one place.',
    },
  ]

  return (
    <div className='flex min-h-screen w-full flex-col rounded-lg border bg-background shadow-md'>
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center border-l border-r px-4 py-8 sm:px-6 sm:py-16'>
        <Link
          href={'https://link.bckgrnd.one/x'}
          passHref
          target='_blank'
          className='w-fit rounded-full bg-muted px-3 py-0.5 text-muted-foreground transition-all hover:text-foreground'
        >
          Follow us on X for updates!
        </Link>
        <h1 className='mt-6 max-w-2xl text-center text-3xl sm:text-4xl md:text-6xl'>
          Streamline your{' '}
          <Palette
            className='inline-block size-8 sm:size-10 md:size-12'
            strokeWidth={2.5}
          />{' '}
          design workflow with ease.
        </h1>
        <p className='mt-4 max-w-lg text-center text-lg text-muted-foreground sm:text-xl'>
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
      <div className='mx-auto w-full max-w-6xl border p-6'>
        <div className='relative aspect-video w-full'>
          <Image
            src='https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/hero-image.webp'
            alt='Hero image'
            priority
            width={1329}
            height={768}
            className='rounded-lg shadow-sm'
          />
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl'>
        <div className='flex size-full flex-col items-center border-x border-b px-6 py-12'>
          <p className='text-muted-foreground'>
            Trusted by designers working with
          </p>
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl'>
        <div className='flex size-full flex-col items-center border-x border-b p-6 py-24'>
          <p className='mb-2 text-sm uppercase text-muted-foreground'>
            Valuable Features
          </p>
          <h2 className='mb-12'>Why use Bckgrnd?</h2>
          <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='size-full rounded-md border p-6 transition-all hover:scale-[101%] hover:shadow-lg'
              >
                <div className='mb-6 flex size-12 items-center justify-center rounded-full bg-muted-foreground/15'>
                  {feature.icon}
                </div>
                <h3 className='mb-2 text-lg font-semibold'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl bg-muted'>
        <div className='flex w-full flex-col gap-4 border-x border-b p-6 sm:p-12 lg:flex-row lg:items-center lg:justify-between'>
          <div className='w-full items-start'>
            <h2 className='text-2xl sm:text-3xl'>
              Ready to elevate your workflow?
            </h2>
            <p className='mt-2 whitespace-nowrap text-muted-foreground'>
              Join our waitlist today and be the first to experience the future
              of design collaboration.
            </p>
          </div>
          <div className='flex w-full items-center justify-start lg:justify-center'>
            <JoinWaitlistButton size='lg' />
          </div>
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl'>
        <div className='flex size-full flex-col items-center border-x border-b p-6 py-24'>
          <p className='mb-2 text-sm uppercase text-muted-foreground'>
            Common Questions
          </p>
          <h2 className='mb-12'>Frequently asked questions</h2>
          <Accordion type='single' collapsible className='w-full space-y-2'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>What is Bckgrnd?</AccordionTrigger>
              <AccordionContent>
                Bckgrnd is a design collaboration platform that helps
                freelancers and agencies streamline their workflow with clients.
                It provides tools for version control, feedback management, and
                project organization - all in one centralized platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>
                Can I integrate with other design tools?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we plan to support integrations with popular design tools
                and platforms to ensure a seamless workflow for your team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>How secure is my data?</AccordionTrigger>
              <AccordionContent>
                We take security seriously. Your data is encrypted and stored
                securely, following industry best practices for data protection
                and privacy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger>
                Do you offer customer support?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we provide dedicated customer support to help you get the
                most out of our platform and resolve any issues quickly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl'>
        <div className='flex w-full flex-col items-center border-x border-b p-4 text-sm text-muted-foreground sm:p-6'>
          <div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
            <p className='text-center sm:text-left'>
              © {new Date().getFullYear()} Bckgrnd. All rights reserved.
            </p>
            <div className='flex flex-wrap justify-center gap-4 sm:justify-end'>
              <Link href='/privacy' className='hover:text-foreground'>
                Privacy
              </Link>
              <Link href='/terms' className='hover:text-foreground'>
                Terms
              </Link>
              <Link href='/contact' className='hover:text-foreground'>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
