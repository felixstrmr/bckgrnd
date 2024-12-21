import { Database } from '@/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTaskComments(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_comments')
    .select(
      '*, workspace:workspaces!inner(domain), user:users(name, email, avatar)',
    )
    .eq('workspace.domain', domain)
    .eq('task', taskId)
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  return data
}

export type TaskComment = Awaited<ReturnType<typeof getTaskComments>>[number]
