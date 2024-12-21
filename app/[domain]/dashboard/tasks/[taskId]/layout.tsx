type Props = {
  header: React.ReactNode
  sidebar: React.ReactNode
  children: React.ReactNode
}

export default function TaskLayout({ header, sidebar, children }: Props) {
  return (
    <div className='flex size-full flex-col'>
      {header}
      <div className='flex size-full'>
        {sidebar}
        {children}
      </div>
    </div>
  )
}
