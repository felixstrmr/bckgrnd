import { z } from 'zod'

export const updateTaskSchema = z.object({
  taskId: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  due_date: z.string().optional(),
  assignee: z.string().optional(),
})
