import { CircleArrowDown, CirclePlay } from 'lucide-react'

import { CircleCheck } from 'lucide-react'

import { CircleArrowUp } from 'lucide-react'

import { Circle } from 'lucide-react'

import { CircleDashed } from 'lucide-react'

// routing
export const VALID_HOME_ROUTES = ['/']
export const WHITELISTED_DOMAIN_ROUTES = ['/login', '/access-denied']

export const MAX_TASK_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const STATUS_ICONS = {
  Backlog: CircleDashed,
  Todo: Circle,
  'In Progress': CirclePlay,
  'In Review': CircleArrowUp,
  'Revisions Needed': CircleArrowDown,
  Done: CircleCheck,
} as const
