import { createClient } from '@/lib/clients/supabase/server'
import { getSession, getUserDetails } from '@/queries/auth'

export default async function Page() {
  const supabase = await createClient()

  const user = await getUserDetails(supabase)
  const session = await getSession(supabase)

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
