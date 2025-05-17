import { supabaseServerClient } from '@/lib/clients/supabase/server'
import {
  getClientsQuery,
  getLatestTaskImageQuery,
  getProjectQuery,
  getProjectsQuery,
  getProjectStatusesQuery,
  getTaskImageQuery,
  getTaskQuery,
  getWorkspaceUserQuery,
} from '@/queries'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getWorkspaceUser = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return unstable_cache(
    async () => {
      return getWorkspaceUserQuery(supabase, domain, user.id)
    },
    ['workspace-user', domain, user.id],
    {
      tags: [`workspace-${domain}`, `workspace-user-${user.id}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getClients = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  return unstable_cache(
    async () => {
      return getClientsQuery(supabase, domain)
    },
    ['clients', domain],
    {
      tags: [`workspace-${domain}`, `clients-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getProject = cache(async (domain: string, projectId: string) => {
  const supabase = await supabaseServerClient()

  return unstable_cache(
    async () => {
      return getProjectQuery(supabase, domain, projectId)
    },
    ['project', domain, projectId],
    {
      tags: [
        `workspace-${domain}`,
        `projects-${domain}`,
        `project-${projectId}`,
      ],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getProjects = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  return unstable_cache(
    async () => {
      return getProjectsQuery(supabase, domain)
    },
    ['projects', domain],
    {
      tags: [`workspace-${domain}`, `projects-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getProjectStatuses = cache(async (domain: string) => {
  const supabase = await supabaseServerClient()

  return unstable_cache(
    async () => {
      return getProjectStatusesQuery(supabase, domain)
    },
    ['project-statuses', domain],
    {
      tags: [`workspace-${domain}`, `project-statuses-${domain}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getTask = cache(async (domain: string, taskId: string) => {
  const supabase = await supabaseServerClient()

  return unstable_cache(
    async () => {
      return getTaskQuery(supabase, taskId)
    },
    ['task', domain, taskId],
    {
      tags: [`workspace-${domain}`, `tasks-${domain}`, `task-${taskId}`],
      revalidate: 60 * 60 * 24, // 24 hours
    },
  )()
})

export const getTaskImage = cache(
  async (domain: string, taskImageId: string) => {
    const supabase = await supabaseServerClient()

    return unstable_cache(
      async () => {
        return getTaskImageQuery(supabase, taskImageId)
      },
      ['task-image', domain, taskImageId],
      {
        tags: [
          `workspace-${domain}`,
          `task-images-${domain}`,
          `task-image-${taskImageId}`,
        ],
        revalidate: 60 * 60 * 24, // 24 hours
      },
    )()
  },
)

export const getLatestTaskImage = cache(
  async (domain: string, taskId: string) => {
    const supabase = await supabaseServerClient()

    return unstable_cache(
      async () => {
        return getLatestTaskImageQuery(supabase, taskId)
      },
      ['task-image', domain, taskId],
      {
        tags: [
          `workspace-${domain}`,
          `task-images-${domain}`,
          `task-image-${taskId}`,
        ],
        revalidate: 60 * 60 * 24, // 24 hours
      },
    )()
  },
)
