import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div className='flex size-full p-6'>
      <div className='flex h-full w-2/3 items-center justify-center'>123</div>
      <div className='h-full w-1/3 rounded-lg border bg-muted shadow-md'></div>
    </div>
  )
}
