'use server'

import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/lib/supabase/server'
import { getDefaultProjectStatus } from '@/queries/project-statuses/get-default-project-status'
import { newProjectSchema } from '@/schemas/new-project-schema'
import { revalidatePath } from 'next/cache'

export const newProjectAction = actionClient
  .schema(newProjectSchema)
  .action(async ({ parsedInput: { domain, name } }) => {
    const supabase = createClient()

    const defaultProjectStatus = await getDefaultProjectStatus(supabase, domain)

    const { data, error } = await supabase
      .from('projects')
      .insert({
        name,
        workspace: defaultProjectStatus.workspace.id,
        status: defaultProjectStatus.id,
      })
      .select()
      .single()

    revalidatePath('/projects', 'page')

    return data
  })
