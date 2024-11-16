'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createProjectSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const createProjectAction = actionClient
  .schema(createProjectSchema)
  .action(
    async ({
      parsedInput: { name, description, domain, client, status, workspace },
    }) => {
      const supabase = await createClient()

      console.log(name, description, domain, client, status, workspace)

      const { data, error } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          client,
          status,
          workspace,
        })
        .select('*')
        .single()

      if (error) {
        console.error(error)
        throw new Error(error.message)
      }

      revalidateTag(`projects-${domain}`)

      return data
    },
  )
