import { z } from 'zod'

export const joinWaitlistSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
})
