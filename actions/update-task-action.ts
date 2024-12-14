'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { updateTaskSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export const updateTaskAction = actionClient
  .schema(updateTaskSchema)
  .action(async ({ parsedInput: { taskId, statusId } }) => {
    const supabase = await createClient()

    const { error } = await supabase
      .from('tasks')
      .update({
        status: statusId,
      })
      .eq('id', taskId)

    if (error) {
      console.error('update-task-action', error)
      throw error
    }

    revalidatePath('/dashboard/projects/[projectId]/tasks', 'page')
  })
