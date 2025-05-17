import { z } from 'zod'

export const workspaceSigninSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
})

export const clientCreateSchema = z.object({
  name: z.string().min(1, 'Required'),
  type: z.enum(['individual', 'company']),
})

export const projectUpdateSchema = z.object({
  id: z.string().min(1, 'Required').uuid('Invalid UUID'),
  status: z.string().uuid('Invalid UUID').optional(),
})
