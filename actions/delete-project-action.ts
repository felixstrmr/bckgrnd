'use server'

import { actionClient } from '@/lib/clients/action-client'
import { deleteProjectSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteProjectAction = actionClient
  .schema(deleteProjectSchema)
  .action(async ({ parsedInput: { id, domain } }) => {
    const supabase = await createClient()

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) throw error

    revalidateTag(`projects-${domain}`)

    return redirect(`/projects`)
  })
