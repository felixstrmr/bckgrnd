import { z } from 'zod'

export const workspaceLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export const createClientSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, { message: 'Must be less than 255 characters' }),
  domain: z.string(),
  workspaceId: z.string().uuid(),
})

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, { message: 'Must be less than 255 characters' }),
  description: z
    .string()
    .max(255, { message: 'Must be less than 255 characters' })
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  workspaceId: z.string().uuid(),
  clientId: z.string().uuid({ message: 'Client is required' }),
  statusId: z.string().uuid().optional(),
})

export const createTaskSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, { message: 'Must be less than 255 characters' }),
    description: z
      .string()
      .max(255, { message: 'Must be less than 255 characters' })
      .optional(),
    priorityId: z.string().uuid({ message: 'Priority is required' }),
    dueDate: z.date().optional(),
    projectId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    statusId: z.string().uuid(),
    workspaceId: z.string().uuid(),
  })
  .refine(
    (data) => {
      if (!data.projectId && !data.clientId) {
        return false
      }
      return true
    },
    {
      message: 'Client is required',
      path: ['clientId'],
    },
  )

export const createTaskCommentSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  taskId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  fileId: z.string().uuid().optional(),
})

export const uploadTaskFileSchema = z.object({
  domain: z.string(),
  taskId: z.string().uuid(),
  clientId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  workspaceId: z.string().uuid(),
  file: z.instanceof(File),
  latestVersion: z.number(),
})

export const updateProjectSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  statusId: z.string().uuid().optional(),
})

export const updateTaskSchema = z.object({
  taskId: z.string().uuid(),
  statusId: z.string().uuid().optional(),
})
