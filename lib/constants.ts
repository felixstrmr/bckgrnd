export const VALID_ERROR_MESSAGES = [
  'Invalid login credentials',
  'You are already on the waitlist',
]

export const WHITELISTED_DOMAIN_ROUTES = ['/invite', '/login']

export const VALID_HOME_ROUTES = ['/', '/privacy', '/terms']
export const VALID_APP_ROUTES = ['/', '/login']

export const TASK_IMAGE_MAX_SIZE = 10 * 1024 * 1024 // 10MB
export const TASK_IMAGE_TYPES = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
}
