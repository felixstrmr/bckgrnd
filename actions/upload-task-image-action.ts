'use server'

import { actionClient } from '@/lib/safe-action'
import { createClient } from '@/lib/supabase/server'
import { uploadTaskImageSchema } from '@/schemas/upload-task-image-schema'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export const uploadTaskImageAction = actionClient
  .schema(uploadTaskImageSchema)
  .action(
    async ({
      parsedInput: { file, projectId, taskId, workspaceId, clientId, version },
    }) => {
      const supabase = createClient()

      const uuid = uuidv4()
      const fileExtension = file.name.split('.').pop()
      const fileName = `v${version + 1}-${uuid}.${fileExtension}`
      const path = `${workspaceId}/${clientId}/${projectId}/${taskId}/${fileName}`

      try {
        const { error: uploadedFileError } = await supabase.storage
          .from('files')
          .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadedFileError) throw uploadedFileError

        const { data: signedUrl, error: signedUrlError } =
          await supabase.storage.from('files').createSignedUrl(path, 3122064000)

        if (signedUrlError) throw signedUrlError

        const { data, error } = await supabase
          .from('task_images')
          .insert({
            id: uuid,
            image_url: signedUrl.signedUrl,
            version: version + 1,
            task: taskId,
            workspace: workspaceId,
            image_size: file.size,
          })
          .select('*')
          .single()

        if (error) throw error

        revalidatePath(`/tasks/${taskId}`, 'layout')

        return data
      } catch (error) {
        console.error('Error in uploadTaskImageAction:', error)
        throw new Error('Failed to upload image. Please try again.')
      }
    },
  )
