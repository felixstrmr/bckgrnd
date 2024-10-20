import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/queries/users/get-current-user'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

export default async function Page() {
  const supabase = createClient()

  const user = await getCurrentUser(supabase)

  const firstName = user.name?.split(' ')[0]

  return (
    <div className='flex size-full p-6'>
      <div className='flex flex-col space-y-1'>
        <h3>Hey, {firstName} 👋🏼</h3>
        <div className='flex items-center space-x-1 text-muted-foreground'>
          <Calendar className='size-3' />
          <p className='text-xs'>{format(new Date(), 'PPPP')}</p>
        </div>
      </div>
    </div>
  )
}
