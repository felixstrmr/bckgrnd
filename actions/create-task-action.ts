'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createTaskSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export const createTaskAction = actionClient
  .schema(createTaskSchema)
  .action(
    async ({
      parsedInput: {
        name,
        description,
        projectId,
        statusId,
        workspaceId,
        priorityId,
        dueDate,
        clientId,
      },
    }) => {
      const supabase = await createClient()

      const due_date = dueDate?.toISOString()

      const { error } = await supabase.from('tasks').insert({
        name,
        description,
        due_date,
        project: projectId,
        status: statusId,
        workspace: workspaceId,
        client: clientId,
        priority: priorityId,
      })

      if (error) {
        console.error('create-task-action', error)
        throw error
      }

      revalidatePath(`/projects/${projectId}/tasks`)
    },
  )
