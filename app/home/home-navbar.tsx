'use client'

import Bckgrnd from '@/components/icons/bckgrnd'
import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomeNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-4 z-50 mx-auto flex w-full justify-between rounded-2xl border bg-background/80 p-2 backdrop-blur-md transition-all duration-500',
        isScrolled
          ? 'max-w-3xl border-border shadow-md'
          : 'max-w-6xl border-transparent',
      )}
    >
      <Link href={'/'} className='flex items-center gap-2.5'>
        <Bckgrnd className='size-9' />
        <h4 className='font-semibold'>Bckgrnd</h4>
      </Link>
      <div className='flex items-center gap-2'>
        <Link
          href={`${env.NEXT_PUBLIC_PROTOCOL}://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/login`}
          className={buttonVariants({ variant: 'ghost' })}
        >
          Login
        </Link>
        <Link
          href={'#hero'}
          className={cn(
            buttonVariants({
              variant: isScrolled ? 'default' : 'secondary',
            }),
            'transition-all duration-300',
          )}
        >
          Join Waitlist
        </Link>
      </div>
    </nav>
  )
}
