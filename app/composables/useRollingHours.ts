import { subDays, addDays, format, parseISO } from 'date-fns'
import type { FlightHourEntry } from '~/types/flightHours'

/**
 * Calculate the rolling sum of flight hours for a given target date.
 * Y(D) = sum of hours from (D − windowDays + 1) through D inclusive.
 */
export function rollingSum(
  entries: FlightHourEntry[],
  targetDate: Date,
  windowDays: number
): number {
  const startDate = subDays(targetDate, windowDays - 1)
  const startStr = format(startDate, 'yyyy-MM-dd')
  const endStr = format(targetDate, 'yyyy-MM-dd')

  let total = 0
  for (const entry of entries) {
    if (entry.date >= startStr && entry.date <= endStr) {
      total += entry.hours
    }
  }

  return Math.round(total * 10) / 10
}

/**
 * Generate an array of 15 rolling-sum data points:
 * 7 days before today, today, 7 days after today.
 */
export function generateChartDataPoints(
  entries: FlightHourEntry[],
  today: Date,
  windowDays: number,
  displayRange: number = 7
): { date: Date; dateStr: string; value: number }[] {
  const points: { date: Date; dateStr: string; value: number }[] = []

  for (let offset = -displayRange; offset <= displayRange; offset++) {
    const targetDate = offset === 0
      ? today
      : offset < 0
        ? subDays(today, Math.abs(offset))
        : addDays(today, offset)

    const dateStr = format(targetDate, 'yyyy-MM-dd')
    const value = rollingSum(entries, targetDate, windowDays)
    points.push({ date: targetDate, dateStr, value })
  }

  return points
}
