import ClientSidebar from '@/components/sidebars/client-sidebar'

type Props = {
  children: React.ReactNode
  params: Promise<{ clientId: string }>
}

export default async function ClientLayout({ children, params }: Props) {
  const { clientId } = await params

  return (
    <div className='flex size-full'>
      <ClientSidebar clientId={clientId} />
      {children}
    </div>
  )
}
