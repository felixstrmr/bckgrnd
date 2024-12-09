'use server'

import { actionClient } from '@/lib/clients/action-client'
import { updateWorkspaceNameSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const updateWorkspaceNameAction = actionClient
  .schema(updateWorkspaceNameSchema)
  .action(async ({ parsedInput: { name, workspace } }) => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('workspaces')
      .update({
        name,
      })
      .eq('id', workspace)
      .select()
      .single()

    if (error) {
      console.error(error)
      throw error
    }

    revalidateTag(`workspace-${data.domain}`)
  })
