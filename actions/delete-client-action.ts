'use server'

import { actionClient } from '@/lib/clients/action-client'
import { deleteClientSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const deleteClientAction = actionClient
  .schema(deleteClientSchema)
  .action(async ({ parsedInput: { domain, id } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('clients').delete().eq('id', id)

    if (error) {
      console.error(error)
      throw error
    }

    revalidateTag(`clients-${domain}`)
  })
