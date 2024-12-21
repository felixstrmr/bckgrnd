import { z } from 'zod'

export const joinWaitlistSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
})
