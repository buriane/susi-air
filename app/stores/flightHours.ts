import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Limits, ChartBounds, FlightHourEntry, FlightHoursMock } from '~/types/flightHours'
import mockData from '~~/data/mock-flight-hours.json'

export const useFlightHoursStore = defineStore('flightHours', () => {
  const entries = ref<FlightHourEntry[]>([])
  const limits = ref<Limits | null>(null)
  const chartBounds = ref<ChartBounds | null>(null)

  function load() {
    const data = mockData as FlightHoursMock
    entries.value = data.flightHours
    limits.value = data.limits
    chartBounds.value = data.chartBounds
  }

  return { entries, limits, chartBounds, load }
})
