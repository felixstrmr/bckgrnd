'use server'

import { actionClient } from '@/lib/clients/action-client'
import { loginSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      throw error
    }

    revalidatePath('/', 'layout')
  })
