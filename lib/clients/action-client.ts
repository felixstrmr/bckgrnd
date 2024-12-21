import { AuthApiError } from '@supabase/supabase-js'
import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof AuthApiError && e.code === 'invalid_credentials') {
      return 'Invalid login credentials'
    }

    return 'Something went wrong! Please try again later.'
  },
})
