import { getDomain } from '@/lib/utils'
import { createSafeActionClient } from 'next-safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message)

    return error.message
  },
}).use(async ({ next }) => {
  const headersList = await headers()
  const host = headersList.get('host')!
  const domain = getDomain(host)

  return next({
    ctx: {
      domain,
    },
  })
})
