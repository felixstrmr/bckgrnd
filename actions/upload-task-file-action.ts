'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { uploadTaskFileSchema } from '@/lib/schemas'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'

export const uploadTaskFileAction = actionClient
  .schema(uploadTaskFileSchema)
  .action(
    async ({
      parsedInput: {
        taskId,
        file,
        domain,
        clientId,
        projectId,
        workspaceId,
        latestVersion,
      },
    }) => {
      const supabase = await createClient()

      const version = latestVersion + 1

      const uuid = randomUUID()
      const fileName = `v${version}-${uuid}.${file.name.split('.').pop()}`
      const path = `/${workspaceId}/${clientId}/${projectId}/${taskId}/${fileName}`

      const { error } = await supabase.storage
        .from('files')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        console.error('upload-task-file-action', error)
        throw error
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const metadata = await sharp(buffer).metadata()

      const { error: fileError } = await supabase.from('files').insert({
        workspace: workspaceId,
        id: uuid,
        name: fileName,
        path,
        size: file.size,
        type: file.type,
        width: metadata.width,
        height: metadata.height,
      })

      if (fileError) {
        console.error('upload-task-file-action', fileError)

        await supabase.storage.from('files').remove([path])

        throw fileError
      }

      const { error: insertError } = await supabase.from('task_files').insert({
        version,
        workspace: workspaceId,
        task: taskId,
        file: uuid,
      })

      if (insertError) {
        console.error('upload-task-file-action', insertError)
        throw insertError
      }

      revalidatePath('/dashboard/tasks/[taskId]', 'page')
    },
  )
