'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { createClientSchema } from '@/schemas/client'
import { revalidatePath } from 'next/cache'

export const createClientAction = actionClient
  .schema(createClientSchema)
  .action(async ({ parsedInput: { name, workspaceId } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('clients').insert({
      name,
      workspace: workspaceId,
    })

    if (error) {
      console.error('create-client-action', error)
      throw error
    }

    revalidatePath('/dashboard/clients')
  })
