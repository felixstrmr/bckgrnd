'use server'

import { actionClient } from '@/lib/clients/action-client'
import { revalidateSchema } from '@/lib/schemas'
import { revalidateTag } from 'next/cache'

export const revalidateTagAction = actionClient
  .schema(revalidateSchema)
  .action(async ({ parsedInput: { tag } }) => {
    await revalidateTag(tag)
  })
