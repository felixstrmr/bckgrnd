import { Database } from '@/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function getTaskStatuses(
  supabase: SupabaseClient<Database>,
  domain: string,
) {
  const { data, error } = await supabase
    .from('task_statuses')
    .select('id, name, color, workspace:workspaces!inner(id, domain)')
    .eq('workspace.domain', domain)
    .order('order', { ascending: true })

  if (error) {
    throw error
  }

  return data
}

export type TaskStatus = Awaited<ReturnType<typeof getTaskStatuses>>[number]
