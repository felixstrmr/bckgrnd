'use server'

import { actionClient } from '@/lib/clients/action-client'
import { updateTaskSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

export const updateTaskAction = actionClient
  .schema(updateTaskSchema)
  .action(async ({ parsedInput: { status, id, domain, project } }) => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id)
      .select()

    if (error) {
      console.error(error)
      throw error
    }

    revalidateTag(`task-${domain}-${id}`)

    return data
  })
