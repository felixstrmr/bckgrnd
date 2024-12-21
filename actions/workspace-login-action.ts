'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { workspaceLoginSchema } from '@/schemas/auth'
import { revalidatePath } from 'next/cache'

export const workspaceLoginAction = actionClient
  .schema(workspaceLoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('workspace-login-action', error)
      throw error
    }

    revalidatePath('/', 'layout')
  })
