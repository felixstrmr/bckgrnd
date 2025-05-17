'use server'

import { authActionClient } from '@/lib/clients/action-client'
import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { projectUpdateSchema } from '@/schemas'
import { revalidateTag } from 'next/cache'

export const projectUpdateAction = authActionClient
  .metadata({
    name: 'project-update-action',
  })
  .schema(projectUpdateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, status } = parsedInput
    const { domain } = ctx

    const supabase = await supabaseServerClient()

    await supabase
      .from('projects')
      .update({ status })
      .eq('id', id)
      .throwOnError()

    revalidateTag(`projects-${domain}`)
    revalidateTag(`project-${id}`)
  })
