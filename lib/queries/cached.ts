import {
  getClients,
  getClientStatuses,
  getProjects,
  getProjectStatuses,
  getTask,
  getTasks,
  getTaskStatuses,
  getWorkspace,
} from '@/lib/queries'
import { SupabaseClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

// Workspace

export async function getWorkspaceWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getWorkspace(supabase, domain),
    [`workspace-${domain}`],
    {
      revalidate: 3600,
      tags: [`workspace-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Client

export async function getClientsWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getClients(supabase, domain),
    [`clients-${domain}`],
    {
      revalidate: 3600,
      tags: [`clients-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Client Status

export async function getClientStatusesWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getClientStatuses(supabase, domain),
    [`client-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`client-statuses-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Project

export async function getProjectsWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getProjects(supabase, domain),
    [`projects-${domain}`],
    {
      revalidate: 3600,
      tags: [`projects-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Project Status

export async function getProjectStatusesWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getProjectStatuses(supabase, domain),
    [`project-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`project-statuses-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Task

export async function getTasksWithCache(
  supabase: SupabaseClient,
  domain: string,
  projectId: string,
) {
  const { data, error } = await unstable_cache(
    async () => getTasks(supabase, domain, projectId),
    [`tasks-${domain}-${projectId}`],
    {
      revalidate: 3600,
      tags: [`tasks-${domain}-${projectId}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

export async function getTaskWithCache(
  supabase: SupabaseClient,
  domain: string,
  taskId: string,
) {
  const { data, error } = await unstable_cache(
    async () => getTask(supabase, domain, taskId),
    [`task-${domain}-${taskId}`],
    {
      revalidate: 3600,
      tags: [`task-${domain}-${taskId}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

// Task Status

export async function getTaskStatusesWithCache(
  supabase: SupabaseClient,
  domain: string,
) {
  const { data, error } = await unstable_cache(
    async () => getTaskStatuses(supabase, domain),
    [`task-statuses-${domain}`],
    {
      revalidate: 3600,
      tags: [`task-statuses-${domain}`],
    },
  )()

  if (error) {
    console.error(error)
    throw error
  }

  return data
}
