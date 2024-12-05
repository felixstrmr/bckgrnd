'use server'

import { actionClient } from '@/lib/clients/action-client'
import { updateProjectSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'

export const updateProjectAction = actionClient
  .schema(updateProjectSchema)
  .action(async ({ parsedInput: { id, status, name, description } }) => {
    const headersList = await headers()
    const domainHeader = headersList.get('x-forwarded-host')

    if (!domainHeader) {
      throw new Error('Missing domain header')
    }

    const domain = getDomain(domainHeader ?? '')
    const supabase = await createClient()

    const { error } = await supabase
      .from('projects')
      .update({ status, name, description })
      .eq('id', id)

    if (error) {
      console.error(error)
      throw error
    }

    revalidateTag(`projects-${domain}`)
  })
