import { z } from 'zod'

export const uploadTaskFileSchema = z.object({
  workspaceId: z.string().uuid(),
  taskId: z.string().uuid(),
  file: z.instanceof(File),
})
