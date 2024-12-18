import { z } from 'zod'
import { zfd } from 'zod-form-data'

// Auth

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const revalidateSchema = z.object({
  tag: z.string().min(1),
})

export const joinWaitlistSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

// Workspace

export const updateWorkspaceNameSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(64, 'Name cannot exceed 64 characters'),
  workspace: z.string().min(1).uuid(),
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

// Client User

export const inviteClientUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  inviterName: z.string().min(1),
  client: z.string().min(1).uuid(),
  clientName: z.string().min(1),
  domain: z.string().min(1),
  workspace: z.string().min(1).uuid(),
  workspaceName: z.string().min(1),
})

// Project

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      'Name can only contain letters, numbers, spaces, hyphens, and underscores',
    ),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  domain: z.string().min(1),
  client: z.string().min(1, 'Client is required').uuid(),
  workspace: z.string().min(1).uuid(),
  status: z.string().min(1).uuid(),
})

export const updateProjectSchema = z.object({
  id: z.string().min(1).uuid(),
  status: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  description: z.string().max(500).optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
})

export const deleteProjectSchema = z.object({
  id: z.string().min(1).uuid(),
  domain: z.string().min(1),
})

// Task

export const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      'Name can only contain letters, numbers, spaces, hyphens, and underscores',
    ),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  domain: z.string().min(1),
  project: z.string().min(1).uuid(),
  status: z.string().min(1).uuid(),
  workspace: z.string().min(1).uuid(),
  priority: z.string().min(1).uuid(),
})

export const updateTaskSchema = z.object({
  id: z.string().min(1).uuid(),
  domain: z.string().min(1),
  project: z.string().min(1).uuid(),
  status: z.string().min(1).uuid(),
})

// Task Image

export const uploadTaskImageSchema = zfd.formData({
  image: zfd.file(),
  task: zfd.text(),
  client: zfd.text(),
  project: zfd.text(),
  domain: zfd.text(),
  workspace: zfd.text(),
  latestVersion: zfd.numeric(),
})

// Task Comment

export const createTaskCommentSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(256, 'Message cannot exceed 256 characters'),
  task: z.string().min(1).uuid(),
  workspace: z.string().min(1).uuid(),
  version: z.string().optional(),
  domain: z.string().min(1),
  project: z.string().min(1).uuid(),
})
