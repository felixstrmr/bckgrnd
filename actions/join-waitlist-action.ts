'use server'

import { actionClient } from '@/lib/clients/action-client'
import { loops } from '@/lib/clients/loops-client'
import { joinWaitlistSchema } from '@/lib/schemas'

export const joinWaitlistAction = actionClient
  .schema(joinWaitlistSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingContact = await loops.findContact({ email })

    if (existingContact[0].mailingLists.clybe6vjg00b40ll4ejfbg6dd) {
      throw new Error('You are already on the waitlist')
    }

    const contactProperties = {}

    const mailingLists = {
      clybe6vjg00b40ll4ejfbg6dd: true,
    }

    const response = await loops.createContact(
      email,
      contactProperties,
      mailingLists,
    )

    if (!response.success) {
      console.error(response.message)
      throw response.message
    }

    return response
  })
