import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(1),
  workspaceId: z.string().min(1),
})
