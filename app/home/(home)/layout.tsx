import HomeNavbar from '@/components/navbars/home-navbar'
import { createClient } from '@/lib/supabase/server'

type Props = {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: Props) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='flex size-full flex-col'>
      <HomeNavbar user={user} />
      <div className='pt-20'>{children}</div>
    </div>
  )
}
