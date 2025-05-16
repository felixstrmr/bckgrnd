import dynamic from 'next/dynamic'

const ClientCreateDialog = dynamic(() =>
  import('@/components/dialogs/client-create-dialog').then(
    (mod) => mod.default,
  ),
)

export default function Page() {
  return (
    <div className='flex size-full flex-col p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold tracking-tight'>Clients</h1>
        <ClientCreateDialog />
      </div>
    </div>
  )
}
