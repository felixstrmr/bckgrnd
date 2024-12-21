'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function HomeNavbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border p-4 transition-all duration-300 lg:mt-8 lg:p-2',
        scrolled
          ? 'max-w-xl border-border bg-background shadow-md'
          : 'max-w-5xl border-transparent',
      )}
    >
      <div className='flex items-center gap-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Bckgrnd />
          <h2
            className={cn(
              'text-xl font-semibold',
              scrolled ? 'hidden' : 'hidden lg:block',
            )}
          >
            Bckgrnd
          </h2>
        </Link>
        <Separator orientation='vertical' className='h-6' />
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

      <div className='flex items-center gap-2 transition-none'>
        <Link
          href={'#'}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            scrolled ? '' : 'hover:bg-foreground/10',
          )}
        >
          Login
        </Link>
        <Link
          href={'#'}
          className={cn(
            'transition-all duration-300',
            buttonVariants({
              variant: scrolled ? 'default' : 'outline',
            }),
          )}
        >
          Join Waitlist
        </Link>
      </div>
    </nav>
  )
}
