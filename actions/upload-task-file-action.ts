'use server'

import { actionClient } from '@/lib/clients/action-client'
import { createClient } from '@/lib/clients/supabase/server'
import { uploadTaskFileSchema } from '@/schemas/task-file'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'

export const uploadTaskFileAction = actionClient
  .schema(uploadTaskFileSchema)
  .action(async ({ parsedInput: { file, taskId, workspaceId } }) => {
    const supabase = await createClient()

    const uuid = randomUUID()
    const fileName = `${uuid}.${file.name.split('.').pop()}`
    const filePath = `/${workspaceId}/tasks/${taskId}/files/${fileName}`

    const { error } = await supabase.storage
      .from('files')
      .upload(filePath, file, {
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
      id: uuid,
      name: fileName,
      path: filePath,
      size: file.size,
      type: file.type,
      workspace: workspaceId,
      image_width: metadata.width,
      image_height: metadata.height,
    })

    if (fileError) {
      console.error('upload-task-file-action', fileError)
      throw fileError
    }

    const { data, error: insertError } = await supabase
      .from('task_files')
      .insert({
        workspace: workspaceId,
        task: taskId,
        file: uuid,
      })
      .select()
      .single()

    if (insertError) {
      console.error('upload-task-file-action', insertError)
      throw insertError
    }

    revalidatePath('/dashboard/tasks/[taskId]', 'layout')

    return data.id
  })
