'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { updateTaskSchema } from '@/schemas/task'
import { revalidatePath } from 'next/cache'

export const updateTaskAction = actionClient
  .schema(updateTaskSchema)
  .action(
    async ({
      parsedInput: { taskId, name, description, status, due_date, assignee },
    }) => {
      const supabase = await createClient()

      const { data, error } = await supabase
        .from('tasks')
        .update({
          name: name || undefined,
          description: description || undefined,
          status: status || undefined,
          due_date: due_date || undefined,
          assignee: assignee || undefined,
        })
        .eq('id', taskId)
        .select()
        .single()

      if (error) {
        console.error('update-task-action', error)
        throw error
      }

      revalidatePath(`/dashboard/tasks/${taskId}`)
      revalidatePath(`/dashboard/tasks`)

      return { task: data }
    },
  )
