'use server'

import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/lib/supabase/server'
import { addProjectSchema } from '@/schemas/add-project-schema'
import { revalidatePath } from 'next/cache'

export const addProjectAction = actionClient
  .schema(addProjectSchema)
  .action(async ({ parsedInput: { name, description, domain, client } }) => {
    const supabase = createClient()

    const { data: workspace, error: workspaceError } = await supabase
      .from('workspaces')
      .select('*')
      .eq('domain', domain)
      .single()

    if (workspaceError) {
      throw workspaceError
    }

    const { data: defaultStatus, error: defaultStatusError } = await supabase
      .from('project_statuses')
      .select('*')
      .eq('is_default', true)
      .single()

    if (defaultStatusError) {
      throw defaultStatusError
    }

    const { error, data } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        workspace: workspace.id,
        status: defaultStatus.id,
        client: client,
      })
      .select('*')
      .single()

    if (error) {
      throw error
    }

    revalidatePath('/projects', 'layout')

    return data
  })
