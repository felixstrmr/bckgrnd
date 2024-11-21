import JoinWaitlistDialog from '@/components/dialogs/join-waitlist-dialog'
import HomeNavbar from '@/components/navbars/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col items-start'>
      <HomeNavbar />
      <JoinWaitlistDialog />
      {children}
    </div>
  )
}
