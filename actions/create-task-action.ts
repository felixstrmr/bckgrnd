'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createTaskSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const createTaskAction = actionClient
  .schema(createTaskSchema)
  .action(
    async ({
      parsedInput: {
        name,
        description,
        domain,
        project,
        status,
        workspace,
        priority,
      },
    }) => {
      const supabase = await createClient()

      const { error } = await supabase.from('tasks').insert({
        name,
        description,
        project,
        status,
        workspace,
        priority,
        type: 'image',
      })

      if (error) {
        console.error(error)
        throw error
      }

      revalidateTag(`tasks-${domain}-${project}`)
    },
  )
