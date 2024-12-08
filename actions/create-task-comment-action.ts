'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createTaskCommentSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const createTaskCommentAction = actionClient
  .schema(createTaskCommentSchema)
  .action(
    async ({
      parsedInput: { message, task, workspace, version, domain, project },
    }) => {
      const supabase = await createClient()

      const { error } = await supabase.from('task_comments').insert({
        message,
        task,
        workspace,
        image: version,
      })

      if (error) {
        console.error(error)
        throw error
      }

      revalidateTag(`tasks-${domain}-${project}`)
    },
  )
