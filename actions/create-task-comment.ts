'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createTaskCommentSchema } from '@/schemas/task-comment'
import { revalidatePath } from 'next/cache'

export const createTaskCommentAction = actionClient
  .schema(createTaskCommentSchema)
  .action(async ({ parsedInput: { taskId, message, workspaceId } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('task_comments').insert({
      task: taskId,
      workspace: workspaceId,
      message,
    })

    if (error) {
      console.error('create-task-comment-action', error)
      throw error
    }

    revalidatePath(`/dashboard/tasks/${taskId}`)
    revalidatePath(`/dashboard/tasks`)
  })
