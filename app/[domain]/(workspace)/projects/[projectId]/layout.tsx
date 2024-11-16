type Props = {
  children: React.ReactNode
}

export default function ProjectLayout({ children }: Props) {
  return <div className='flex size-full'>{children}</div>
}
