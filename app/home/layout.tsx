import HomeNavbar from '@/components/navbars/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col bg-muted p-2 pt-0'>
      <HomeNavbar />
      {children}
    </div>
  )
}
