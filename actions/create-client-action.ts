'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClientSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const createClientAction = actionClient
  .schema(createClientSchema)
  .action(async ({ parsedInput: { name, workspace, domain, status } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('clients').insert({
      name,
      workspace,
      status,
    })

    if (error) {
      console.error(error)
      throw error
    }

    revalidateTag(`clients-${domain}`)
  })
