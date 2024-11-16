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

// Project

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  domain: z.string().min(1),
  client: z.string().min(1).uuid(),
  workspace: z.string().min(1).uuid(),
  status: z.string().min(1).uuid(),
})

// Task

export const updateTaskSchema = z.object({
  id: z.string().min(1).uuid(),
  domain: z.string().min(1),
  status: z.string().min(1).uuid(),
})

// Workspace

export const updateWorkspaceNameSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      'Name can only contain letters, numbers, spaces, hyphens, and underscores',
    ),
  id: z.string().min(1).uuid(),
  domain: z.string().min(1),
})
