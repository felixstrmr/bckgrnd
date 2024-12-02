'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

export const shareTaskImageAction = actionClient
  .schema(
    z.object({
      path: z.string(),
      expiresIn: z.enum(['1 week', '1 month', '1 year']),
    }),
  )
  .action(async ({ parsedInput: { path, expiresIn } }) => {
    const supabase = await createClient()

    const expiresInSeconds = {
      '1 week': 60 * 60 * 24 * 7,
      '1 month': 60 * 60 * 24 * 30,
      '1 year': 60 * 60 * 24 * 365,
    }[expiresIn]

    const { data, error } = await supabase.storage
      .from('files')
      .createSignedUrl(path, expiresInSeconds)

    if (error) {
      console.error(error)
      throw error
    }

    return data.signedUrl
  })
