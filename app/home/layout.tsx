import HomeNavbar from '@/app/home/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className='relative min-h-screen w-full'>
      <HomeNavbar />
      {children}
    </main>
  )
}
