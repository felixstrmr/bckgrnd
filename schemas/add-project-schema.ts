import { z } from 'zod'

export const addProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  domain: z.string().min(1),
  client: z.string().uuid(),
})
