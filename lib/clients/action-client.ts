import { WHITELISTED_ERROR_MESSAGES } from '@/lib/constants'
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    if (WHITELISTED_ERROR_MESSAGES.includes(e.message)) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
