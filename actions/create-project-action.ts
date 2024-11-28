'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createProjectSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const createProjectAction = actionClient
  .schema(createProjectSchema)
  .action(
    async ({
      parsedInput: {
        name,
        description,
        domain,
        client,
        status,
        workspace,
        date,
      },
    }) => {
      const supabase = await createClient()

      let startDate: string | undefined
      let endDate: string | undefined

      if (date?.from && !date?.to) {
        endDate = date?.from?.toISOString()
        startDate = undefined
      } else {
        startDate = date?.from?.toISOString()
        endDate = date?.to?.toISOString()
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          client,
          status,
          workspace,
          start_date: startDate,
          end_date: endDate,
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
