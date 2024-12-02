import { env } from '@/lib/env'
import { Dub } from 'dub'

export const dub = new Dub({
  token: env.DUB_API_KEY,
})
