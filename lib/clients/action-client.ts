import { VALID_ERROR_MESSAGES } from '@/lib/constants'
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (VALID_ERROR_MESSAGES.includes(error.message)) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
