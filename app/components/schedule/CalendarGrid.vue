<script setup lang="ts">
import { computed } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getDate,
  isSameMonth,
  isSameDay,
  format,
} from 'date-fns'
import type { ScheduleEntry } from '~/types/schedule'
import { useToday } from '~/composables/useToday'

const props = defineProps<{
  currentMonth: Date
  schedules: ScheduleEntry[]
}>()

const emit = defineEmits<{
  selectDate: [date: Date]
}>()

const today = useToday()

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const scheduleMap = computed(() => {
  const map = new Map<string, ScheduleEntry>()
  for (const entry of props.schedules) {
    map.set(entry.duty_date, entry)
  }
  return map
})

const calendarDays = computed(() => {
  const monthStart = startOfMonth(props.currentMonth)
  const monthEnd = endOfMonth(props.currentMonth)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })

  return days.map((date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return {
      date,
      day: getDate(date),
      isCurrentMonth: isSameMonth(date, props.currentMonth),
      isToday: isSameDay(date, today),
      entry: scheduleMap.value.get(dateKey) ?? null,
    }
  })
})

function handleSelect(date: Date) {
  emit('selectDate', date)
}
</script>

<template>
  <div class="calendar-grid">
    <div class="calendar-grid__header">
      <span
        v-for="label in WEEKDAY_LABELS"
        :key="label"
        class="calendar-grid__weekday"
      >
        {{ label }}
      </span>
    </div>

    <div class="calendar-grid__body">
      <ScheduleCalendarDayCell
        v-for="(item, idx) in calendarDays"
        :key="idx"
        :day="item.day"
        :entry="item.entry"
        :is-today="item.isToday"
        :is-current-month="item.isCurrentMonth"
        @select="handleSelect(item.date)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-grid {
  background: $color-bg-surface;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
  padding: 12px;

  &__header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

  &__weekday {
    text-align: center;
    font-family: $font-family-base;
    font-size: $font-size-label;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    padding: 4px 0;
    user-select: none;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }
}
</style>
