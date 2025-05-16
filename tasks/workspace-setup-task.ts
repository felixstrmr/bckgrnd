import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { schemaTask } from '@trigger.dev/sdk/v3'
import { z } from 'zod'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_SECRET as string,
)

export const workspaceSetupTask = schemaTask({
  id: 'workspace-setup-task',
  schema: z.object({
    workspaceId: z.string().min(1).uuid(),
  }),
  run: async (payload) => {
    const { workspaceId } = payload

    const projectStatuses = [
      {
        name: 'Not started',
        icon: 'CircleDashed',
        color: '#52525b',
        is_default: true,
        order: 0,
        workspace: workspaceId,
      },
      {
        name: 'In progress',
        icon: 'CirclePlay',
        color: '#2563eb',
        is_default: false,
        order: 1,
        workspace: workspaceId,
      },
      {
        name: 'On hold',
        icon: 'CirclePause',
        color: '#ca8a04',
        is_default: false,
        order: 2,
        workspace: workspaceId,
      },
      {
        name: 'Completed',
        icon: 'CircleCheck',
        color: '#16a34a',
        is_default: false,
        order: 3,
        workspace: workspaceId,
      },
      {
        name: 'Cancelled',
        icon: 'CircleX',
        color: '#dc2626',
        is_default: false,
        order: 4,
        workspace: workspaceId,
      },
    ]

    await supabase
      .from('project_statuses')
      .insert(projectStatuses)
      .throwOnError()
  },
})
