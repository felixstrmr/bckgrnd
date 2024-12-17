import { Database } from '@/types/supabase'
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'

export async function getTaskComments(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_comments')
    .select('*, workspace:workspaces!inner(domain)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)

  if (error) {
    throw error
  }

  return data
}

export type TaskComment = Awaited<ReturnType<typeof getTaskComments>>

export async function getTaskCommentsWithRelations(
  supabase: SupabaseClient<Database>,
  domain: string,
  taskId: string,
) {
  const { data, error } = await supabase
    .from('task_comments')
    .select('*, workspace:workspaces!inner(domain), user:users!inner(*)')
    .eq('workspace.domain', domain)
    .eq('task', taskId)

  if (error) {
    throw error
  }

  return data
}

export type TaskCommentWithRelations = Awaited<
  ReturnType<typeof getTaskCommentsWithRelations>
>
