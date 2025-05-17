import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='bg-background flex size-full items-center justify-center'>
      <Loader className='size-4 animate-spin' />
    </div>
  )
}
