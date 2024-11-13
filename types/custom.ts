import { Client, ClientStatus } from '@/types'

export type ClientWithRelations = Client & {
  workspace: {
    domain: string
  }
  status: ClientStatus
}
