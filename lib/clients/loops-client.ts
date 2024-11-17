import { env } from '@/lib/env'
import { LoopsClient } from 'loops'

export const loops = new LoopsClient(env.LOOPS_API_KEY)
