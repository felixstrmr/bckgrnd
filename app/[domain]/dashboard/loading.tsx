import Loader from '@/components/icons/loader'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center bg-background'>
      <Loader className='size-8 animate-spin' />
    </div>
  )
}
