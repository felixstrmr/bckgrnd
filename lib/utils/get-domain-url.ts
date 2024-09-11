import { env } from '@/lib/env'

export function getDomainUrl(domain: string) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  if (domain.includes('.')) {
    return `${protocol}://${domain}`
  } else {
    return `${protocol}://${domain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }
}
