import { env } from '@/lib/env'

export function getDomain(domain: string) {
  if (domain.includes('.')) {
    return domain
  } else {
    return `${domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }
}
