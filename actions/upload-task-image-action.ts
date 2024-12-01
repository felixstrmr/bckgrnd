'use server'

import { actionClient } from '@/lib/clients/action-client'
import { uploadTaskImageSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'
import { revalidateTag } from 'next/cache'
import sharp from 'sharp'

export const uploadTaskImageAction = actionClient
  .schema(uploadTaskImageSchema)
  .action(
    async ({
      parsedInput: {
        image,
        domain,
        task,
        client,
        project,
        workspace,
        latestVersion,
      },
    }) => {
      const supabase = await createClient()

      const uuid = randomUUID()
      const fileName = `v${latestVersion + 1}-${uuid}.${image.name.split('.').pop()}`
      const path = `/${workspace}/${client}/${project}/${task}/${fileName}`

      const { error } = await supabase.storage
        .from('files')
        .upload(path, image, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        console.error(error)
        throw error
      }

      const buffer = Buffer.from(await image.arrayBuffer())
      const metadata = await sharp(buffer).metadata()

      const { error: insertError } = await supabase.from('task_images').insert({
        workspace,
        id: uuid,
        task,
        version: 1,
        image_name: fileName,
        image_size: image.size,
        image_type: image.type,
        image_path: path,
        image_width: metadata.width,
        image_height: metadata.height,
      })

      if (insertError) {
        console.error(insertError)
        throw insertError
      }

      revalidateTag(`task-${domain}-${task}`)
      revalidateTag(`task-images-${task}`)
    },
  )
