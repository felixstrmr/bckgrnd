import HomeNavbar from '@/components/navbars/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='relative min-h-screen w-full'>
      <HomeNavbar />
      {children}
    </div>
  )
}
