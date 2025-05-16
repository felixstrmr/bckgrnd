import { getDomain } from '@/lib/utils'
import { getClients } from '@/queries/cached'
import dynamic from 'next/dynamic'

const ClientCreateDialog = dynamic(() =>
  import('@/components/dialogs/client-create-dialog').then(
    (mod) => mod.default,
  ),
)

type Props = {
  params: Promise<{ workspace: string }>
}

export default async function Page({ params }: Props) {
  const { workspace } = await params
  const domain = getDomain(workspace)

  const clients = await getClients(domain)

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Clients</h1>
        <ClientCreateDialog />
      </div>
      <pre>{JSON.stringify(clients, null, 2)}</pre>
    </div>
  )
}
