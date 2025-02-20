import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC',
  hour12: true
})

export const formatDateFromMS = (ms: number) => dateFormatter.format(ms)?.replace(/\b(am|pm)\b/g, (match) => match?.toUpperCase());
