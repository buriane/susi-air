<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addMonths, subMonths } from 'date-fns'
import { Calendar } from 'lucide-vue-next'
import { useScheduleStore } from '~/stores/schedule'
import { useToday } from '~/composables/useToday'

const scheduleStore = useScheduleStore()
const today = useToday()

const isSimulatingLoad = ref(true)
const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref<Date | null>(null)

onMounted(() => {
  if (scheduleStore.schedules.length === 0) {
    scheduleStore.load()
  }
  setTimeout(() => {
    isSimulatingLoad.value = false
  }, 600)
})

const isLoaded = computed(() =>
  scheduleStore.schedules.length > 0 &&
  scheduleStore.legend.length > 0 &&
  !isSimulatingLoad.value
)

function goToPrev() {
  currentMonth.value = subMonths(currentMonth.value, 1)
}

function goToNext() {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

function handleSelectDate(date: Date) {
  selectedDate.value = date
}

function handleCloseDetail() {
  selectedDate.value = null
}
</script>

<template>
  <div class="schedule-page">
    <template v-if="isLoaded">
      <div class="schedule-page__header">
        <Calendar :size="20" :stroke-width="1.5" />
        <h2 class="schedule-page__title">Schedule</h2>
      </div>
      <ScheduleCalendarNavigation
        :current-month="currentMonth"
        @prev="goToPrev"
        @next="goToNext"
      />

      <ScheduleCalendarGrid
        :current-month="currentMonth"
        :schedules="scheduleStore.schedules"
        @select-date="handleSelectDate"
      />

      <ScheduleDutyLegend :legend="scheduleStore.legend" />

      <ScheduleDayDetailPlaceholder
        v-if="selectedDate"
        :date="selectedDate"
        @close="handleCloseDetail"
      />
    </template>

    <template v-else>
      <ScheduleSkeleton />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.schedule-page {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;
  }

  &__title {
    font-family: $font-family-base;
    font-size: $font-size-title;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin: 0;
  }
}
</style>
