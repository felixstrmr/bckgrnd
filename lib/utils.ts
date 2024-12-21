import { env } from '@/lib/env'
import { clsx, type ClassValue } from 'clsx'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractDomain(url: string) {
  return url.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
}

export function formatRelativeDate(date: string): string {
  const dateObj = new Date(date)

  const now = new Date()
  const isPast = dateObj < now

  const seconds = Math.abs(differenceInSeconds(dateObj, now))
  const minutes = Math.abs(differenceInMinutes(dateObj, now))
  const hours = Math.abs(differenceInHours(dateObj, now))
  const days = Math.abs(differenceInDays(dateObj, now))
  const weeks = Math.abs(differenceInWeeks(dateObj, now))
  const months = Math.abs(differenceInMonths(dateObj, now))
  const years = Math.abs(differenceInYears(dateObj, now))

  const prefix = isPast ? '' : 'in '
  const suffix = isPast ? ' ago' : ''

  if (seconds < 60) {
    return isPast ? 'just now' : 'in a moment'
  } else if (minutes < 60) {
    return `${prefix}${Math.floor(minutes)}m${suffix}`
  } else if (hours < 24) {
    return `${prefix}${Math.floor(hours)}h${suffix}`
  } else if (days < 7) {
    return `${prefix}${Math.floor(days)}d${suffix}`
  } else if (weeks < 4) {
    return `${prefix}${Math.floor(weeks)}w${suffix}`
  } else if (months < 12) {
    return `${prefix}${Math.floor(months)}mo${suffix}`
  } else {
    return `${prefix}${Math.floor(years)}y${suffix}`
  }
}
