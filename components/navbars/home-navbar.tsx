'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
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
        <Link href={'/'} className='flex items-center gap-2'>
          <Bckgrnd className='rounded-md shadow' />
          <span>
            <h4>Bckgrnd</h4>
          </span>
        </Link>
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
