import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Loader2 className='size-9 animate-spin' />
    </div>
  )
}
