'use server'

import { actionClient } from '@/lib/clients/action-client'
import { uploadTaskImageSchema } from '@/lib/schemas'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'
import { revalidateTag } from 'next/cache'

export const uploadTaskImageAction = actionClient
  .schema(uploadTaskImageSchema)
  .action(async ({ parsedInput: { image, domain, task } }) => {
    const supabase = await createClient()

    const uuid = randomUUID()
    const fileName = `${uuid}.${image.name.split('.').pop()}`
    const path = `tasks/${fileName}`

    const { error } = await supabase.storage.from('files').upload(path, image, {
      cacheControl: '3600',
      upsert: false,
    })

    if (error) {
      console.error(error)
      throw error
    }

    const { data: signedUrl, error: signUrlError } = await supabase.storage
      .from('files')
      .createSignedUrl(path, 31536000)

    if (signUrlError) {
      console.error(signUrlError)
      throw signUrlError
    }

    const { error: insertError } = await supabase.from('task_images').insert({
      workspace: 'a51bce4b-8674-49a1-a831-9cc063800e76',
      id: uuid,
      task,
      version: 1,
      image_url: signedUrl.signedUrl,
      image_name: fileName,
      image_size: image.size,
      image_type: image.type,
    })

    if (insertError) {
      console.error(insertError)
      throw insertError
    }

    revalidateTag(`task-${domain}-${task}`)
  })
