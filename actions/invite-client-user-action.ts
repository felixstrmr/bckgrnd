'use server'

import { actionClient } from '@/lib/clients/action-client'
import { loops } from '@/lib/clients/loops-client'
import { env } from '@/lib/env'
import { inviteClientUserSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const inviteClientUserAction = actionClient
  .schema(inviteClientUserSchema)
  .action(
    async ({
      parsedInput: {
        email,
        client,
        domain,
        workspace,
        inviterName,
        clientName,
        workspaceName,
      },
    }) => {
      const supabase = await createClient()

      const inviteToken = Buffer.from(
        `${email}:${client}:${workspace}`,
      ).toString('base64')

      const formattedDomain = domain.includes('.')
        ? domain
        : `${domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`

      const inviteUrl = `${env.NEXT_PUBLIC_PROTOCOL}://${formattedDomain}/invite?token=${inviteToken}`
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

      const { error } = await supabase.from('client_user_invitations').insert({
        email,
        client,
        workspace,
        token: inviteToken,
        expires_at: expiresAt,
      })

      if (error) {
        console.error(error)
        throw error
      }

      const resp = await loops.sendTransactionalEmail({
        transactionalId: 'cm48tkh0r01b7lr31xm3a6jvc',
        email,
        dataVariables: {
          inviteUrl,
          expiresAt,
          inviterName,
          clientName,
          workspaceName,
        },
      })

      if (!resp.success) {
        throw new Error('Failed to send invite email')
      }

      revalidateTag(`client-user-invitations-${domain}-${client}`)
    },
  )
