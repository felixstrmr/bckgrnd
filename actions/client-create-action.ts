'use server'

import { authActionClient } from '@/lib/clients/action-client'
import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { clientCreateSchema } from '@/schemas'
import { revalidateTag } from 'next/cache'

export const clientCreateAction = authActionClient
  .metadata({
    name: 'client-create-action',
  })
  .schema(clientCreateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, type } = parsedInput
    const { workspaceUser } = ctx

    const workspaceId = workspaceUser.workspace.id
    const workspaceDomain = workspaceUser.workspace.domain

    const supabase = await supabaseServerClient()

    await supabase
      .from('clients')
      .insert({
        name,
        type,
        workspace: workspaceId,
      })
      .throwOnError()

    revalidateTag(`clients-${workspaceDomain}`)
  })
