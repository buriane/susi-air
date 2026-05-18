import { describe, expect, it } from 'vitest'
import { rollingSum } from '../useRollingHours'
import mockData from '../../../data/mock-flight-hours.json'
import type { FlightHourEntry } from '../../types/flightHours'

describe('rollingSum', () => {
  const entries = (mockData as { flightHours: FlightHourEntry[] }).flightHours
  const today = new Date('2026-05-31')

  it('returns a non-negative value for 7-day and 30-day windows', () => {
    expect(rollingSum(entries, today, 7)).toBeGreaterThanOrEqual(0)
    expect(rollingSum(entries, today, 30)).toBeGreaterThanOrEqual(0)
  })

  it('returns a 30-day sum that is >= 7-day sum for the same date', () => {
    const week = rollingSum(entries, today, 7)
    const month = rollingSum(entries, today, 30)
    expect(month).toBeGreaterThanOrEqual(week)
  })

  it('returns 0 when there is no data', () => {
    expect(rollingSum([], today, 7)).toBe(0)
  })

  it('handles the first date in the dataset', () => {
    const firstEntry = entries[0]
    if (!firstEntry) {
      throw new Error('Expected mock flight hours to include at least one entry')
    }
    const firstDate = new Date(firstEntry.date)
    const result = rollingSum(entries, firstDate, 7)
    expect(result).toBeCloseTo(firstEntry.hours, 1)
  })
})
