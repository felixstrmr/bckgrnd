import FullLogo from '@/components/brand/full-logo'
import { buttonVariants } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

type Props = {
  user: User | null
}

export default function HomeNavbar({ user }: Props) {
  return (
    <nav className='mx-auto flex w-full max-w-5xl justify-between py-4'>
      <Link href={'/'}>
        <FullLogo />
      </Link>
      <div>
        {user ? (
          <Link
            href={'/dashboard'}
            className={buttonVariants({ variant: 'default' })}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href={'/login'}
            className={buttonVariants({ variant: 'default' })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
