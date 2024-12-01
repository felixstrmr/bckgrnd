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

export function getDomain(url: string) {
  return url.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const isPast = date < now

  const seconds = Math.abs(differenceInSeconds(date, now))
  const minutes = Math.abs(differenceInMinutes(date, now))
  const hours = Math.abs(differenceInHours(date, now))
  const days = Math.abs(differenceInDays(date, now))
  const weeks = Math.abs(differenceInWeeks(date, now))
  const months = Math.abs(differenceInMonths(date, now))
  const years = Math.abs(differenceInYears(date, now))

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

export function formatFileSize(size: number): string {
  if (!Number.isFinite(size) || size < 0) return 'Invalid size'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = Math.abs(size)
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }

  const decimals = unitIndex === 0 ? 0 : 2
  return `${value.toFixed(decimals)}${units[unitIndex]}`
}

export function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon'
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening'
  } else {
    return 'Good night'
  }
}
