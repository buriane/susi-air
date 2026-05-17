import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pilot } from '~/types/pilot'
import type { FlightHoursMock } from '~/types/flightHours'
import mockData from '~~/data/mock-flight-hours.json'

export const usePilotStore = defineStore('pilot', () => {
  const name = ref<string>('')
  const totalFlightHours = ref<number>(0)

  function load() {
    const data = mockData as FlightHoursMock
    name.value = data.pilot.name
    totalFlightHours.value = data.pilot.totalFlightHours
  }

  return { name, totalFlightHours, load }
})
