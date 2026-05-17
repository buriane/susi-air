import type { Pilot } from './pilot'

export interface Limits {
  daily: number
  weekly: number
  monthly: number
  annual: number
}

export interface ChartBound {
  limit: number
  max: number
  windowDays: number
  displayRangeDays: number
}

export type ChartToggle = '1w' | '1m' | '3m' | '6m' | '1y'

export type ChartBounds = Record<ChartToggle, ChartBound>

export interface FlightHourEntry {
  date: string
  hours: number
}

export interface FlightHoursMock {
  pilot: Pilot
  limits: Limits
  chartBounds: ChartBounds
  flightHours: FlightHourEntry[]
}
