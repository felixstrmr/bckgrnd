import { z } from 'zod'

export const createTaskCommentSchema = z.object({
  taskId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  message: z.string().min(1),
})
