import { env } from '@/lib/env'
import { Polar } from '@polar-sh/sdk'

export const polar = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: 'sandbox',
})
