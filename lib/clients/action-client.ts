import { getDomain } from '@/lib/utils'
import { getWorkspaceUser } from '@/queries/cached'
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

export const authActionClient = actionClient.use(async ({ next, ctx }) => {
  const { domain } = ctx

  const workspaceUser = await getWorkspaceUser(domain)

  if (!workspaceUser) {
    throw new Error('Unauthorized')
  }

  return next({
    ctx: { workspaceUser },
  })
})
