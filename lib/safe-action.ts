import { WHITELISTED_ERROR_MESSAGES } from '@/lib/constants'
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(e, utils) {
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils

    console.error('Action error:', e.message)
    console.error('Client input:', clientInput)
    console.error('Bind args client inputs:', bindArgsClientInputs)
    console.error('Metadata:', metadata)
    console.error('Context:', ctx)

    if (WHITELISTED_ERROR_MESSAGES.includes(e.message)) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
