import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LegendItem, ScheduleEntry, SchedulesMock } from '~/types/schedule'
import mockData from '~~/data/mock-schedules.json'

export const useScheduleStore = defineStore('schedule', () => {
  const today = ref<string>('')
  const legend = ref<LegendItem[]>([])
  const schedules = ref<ScheduleEntry[]>([])

  function load() {
    const data = mockData as SchedulesMock
    today.value = data.today
    legend.value = data.legend
    schedules.value = data.schedules
  }

  return { today, legend, schedules, load }
})
