import { z } from 'zod'

export const newProjectSchema = z.object({
  domain: z.string().min(1),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1),
  description: z.string().optional(),
})
