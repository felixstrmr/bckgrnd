'use server'

import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/lib/supabase/server'
import { workspaceLoginSchema } from '@/schemas/login-schema'
import { revalidatePath } from 'next/cache'

export const workspaceLoginAction = actionClient
  .schema(workspaceLoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    revalidatePath('/', 'layout')
  })
