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
      className={cn('fixed left-0 right-0 top-4 z-50 w-full transition-all')}
    >
      <div
        className={cn(
          'mx-auto flex w-full justify-between rounded-2xl border p-2 transition-all duration-300',
          scrolled
            ? 'max-w-xl border-border bg-background/75 shadow-md backdrop-blur-md'
            : 'max-w-5xl border-transparent',
        )}
      >
        <div className='flex items-center gap-4'>
          <Link href={'/'} className='flex items-center'>
            <Bckgrnd className='rounded-md shadow' />
            <span
              className={cn(
                'transition-all duration-300',
                scrolled
                  ? 'w-0 -translate-x-full opacity-0'
                  : 'ml-2 -translate-x-0',
              )}
            >
              <h4>Bckgrnd</h4>
            </span>
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

        <div className='flex items-center gap-2'>
          <Link href={'#'} className={buttonVariants({ variant: 'ghost' })}>
            Login
          </Link>
          <Link
            href={'#'}
            className={buttonVariants({
              variant: scrolled ? 'default' : 'outline',
            })}
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  )
}
