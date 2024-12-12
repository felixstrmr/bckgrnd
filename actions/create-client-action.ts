'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createClientSchema } from '@/lib/schemas'
import { revalidateTag } from 'next/cache'

export const createClientAction = actionClient
  .schema(createClientSchema)
  .action(async ({ parsedInput: { name, domain, workspaceId } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('clients').insert({
      name,
      workspace: workspaceId,
    })

    if (error) {
      console.log('create-client-action', error)
      throw error
    }

    revalidateTag(`clients-${domain}`)
  })
