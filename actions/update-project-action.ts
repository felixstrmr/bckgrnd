'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { updateProjectSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

export const updateProjectAction = actionClient
  .schema(updateProjectSchema)
  .action(
    async ({ parsedInput: { projectId, name, description, statusId } }) => {
      const supabase = await createClient()

      const { error } = await supabase
        .from('projects')
        .update({ name, description, status: statusId })
        .eq('id', projectId)

      if (error) {
        console.error(error)
        throw error
      }

      revalidatePath('/dashboard/projects/[projectId]', 'layout')
      revalidatePath('/dashboard/projects', 'page')
    },
  )
