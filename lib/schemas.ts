import { z } from 'zod'

// Auth

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const revalidateSchema = z.object({
  tag: z.string().min(1),
})

// Client

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  domain: z.string().min(1),
  status: z.string().min(1).uuid(),
  workspace: z.string().min(1).uuid(),
})

export const deleteClientSchema = z.object({
  domain: z.string().min(1),
  id: z.string().min(1).uuid(),
})
