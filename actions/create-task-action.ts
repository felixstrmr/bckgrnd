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
        priority: '4e460ffd-a2f3-427f-84da-b0e011eca56e',
      })

      if (error) {
        console.error('create-task-action', error)
        throw error
      }

      revalidatePath(`/projects/${projectId}/tasks`)
    },
  )
