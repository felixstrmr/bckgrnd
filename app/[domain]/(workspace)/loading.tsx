import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center bg-background'>
      <Loader className='size-9 animate-spin' />
    </div>
  )
}
