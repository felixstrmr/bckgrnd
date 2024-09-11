'use server'

import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/lib/supabase/server'
import { homeLoginSchema } from '@/schemas/home-login-schema'
import { revalidatePath } from 'next/cache'

export const homeLoginAction = actionClient
  .schema(homeLoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    revalidatePath('/', 'layout')
  })
