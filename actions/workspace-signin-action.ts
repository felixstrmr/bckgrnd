'use server'

import { actionClient } from '@/lib/clients/action-client'
import { supabaseServerClient } from '@/lib/clients/supabase/server'
import { workspaceSigninSchema } from '@/schemas'
import { revalidatePath, revalidateTag } from 'next/cache'

export const workspaceSigninAction = actionClient
  .metadata({
    name: 'workspace-signin-action',
  })
  .schema(workspaceSigninSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { email, password } = parsedInput
    const { domain } = ctx

    const supabase = await supabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    revalidateTag(`user-${data.user.id}`)
    revalidateTag(`workspace-user-${domain}-${data.user.id}`)

    // temp
    revalidatePath('/', 'layout')
  })
