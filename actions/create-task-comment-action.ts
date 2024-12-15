'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createTaskCommentSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export const createTaskCommentAction = actionClient
  .schema(createTaskCommentSchema)
  .action(async ({ parsedInput: { message, taskId, workspaceId, fileId } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('task_comments').insert({
      message,
      task: taskId,
      workspace: workspaceId,
      file: fileId,
    })

    if (error) {
      console.error('create-task-comment-action', error)
      throw error
    }

    revalidatePath(`/tasks/${taskId}`)
  })
