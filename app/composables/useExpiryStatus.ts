import { differenceInDays, parseISO } from 'date-fns'
import type { ExpiryStatus } from '~/types/document'
import { useToday } from './useToday'

export function getExpiryStatus(expiryDate: string): ExpiryStatus {
  const today = useToday()
  const daysRemaining = differenceInDays(parseISO(expiryDate), today)

  if (daysRemaining <= 0) return 'red'
  if (daysRemaining <= 30) return 'amber'
  return 'green'
}

export function getDaysRemaining(expiryDate: string): number {
  const today = useToday()
  return differenceInDays(parseISO(expiryDate), today)
}
