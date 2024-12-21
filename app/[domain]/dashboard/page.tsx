import { createClient } from '@/lib/clients/supabase/server'
import { getTaskComments } from '@/queries/task-comment'

export default async function Page() {
  const supabase = await createClient()

  const comments = await getTaskComments(
    supabase,
    'felixstrmr',
    '61da4c34-626f-40a1-961d-b3f9b04eb50f',
  )

  return (
    <div>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </div>
  )
}
