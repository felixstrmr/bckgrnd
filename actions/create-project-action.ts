'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createProjectSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export const createProjectAction = actionClient
  .schema(createProjectSchema)
  .action(
    async ({
      parsedInput: {
        name,
        clientId,
        workspaceId,
        startDate,
        endDate,
        description,
      },
    }) => {
      const supabase = await createClient()

      const start_date = startDate?.toISOString()
      const end_date = endDate?.toISOString()

      const { data: defaultProjectStatus, error: defaultProjectStatusError } =
        await supabase
          .from('project_statuses')
          .select('id')
          .eq('workspace', workspaceId)
          .eq('is_default', true)
          .single()

      if (defaultProjectStatusError) {
        console.error('create-project-action', defaultProjectStatusError)
        throw defaultProjectStatusError
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          start_date,
          end_date,
          client: clientId,
          workspace: workspaceId,
          status: defaultProjectStatus?.id,
        })
        .select()
        .single()

      if (error) {
        console.error('create-project-action', error)
        throw error
      }

      revalidatePath(`/dashboard/projects`)

      return data
    },
  )
