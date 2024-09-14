import { file, zfd } from 'zod-form-data'

export const uploadTaskImageSchema = zfd.formData({
  file: zfd.file(),
  clientId: zfd.text(),
  taskId: zfd.text(),
  workspaceId: zfd.text(),
  projectId: zfd.text(),
  version: zfd.numeric(),
})
