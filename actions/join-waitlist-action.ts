'use server'

import { loops } from '@/lib/loops'
import { actionClient } from '@/lib/safe-action'
import { joinWaitlistSchema } from '@/schemas/join-waitlist-schema'

export const joinWaitlistAction = actionClient
  .schema(joinWaitlistSchema)
  .action(async ({ parsedInput: { email } }) => {
    const contactProperties = {}
    const mailingLists = {
      clybe6vjg00b40ll4ejfbg6dd: true,
    }
    const resp = await loops.createContact(
      email,
      contactProperties,
      mailingLists,
    )

    if (!resp.success) throw new Error(resp.message)
  })
