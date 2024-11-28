type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return <div className='flex size-full'>{children}</div>
}
