<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import type { ScheduleEntry } from '~/types/schedule'

const props = defineProps<{
  day: number
  entry: ScheduleEntry | null
  isToday: boolean
  isCurrentMonth: boolean
}>()

const emit = defineEmits<{
  select: [day: number]
}>()

const isCompleted = computed(() => {
  if (!props.entry) return false
  return props.entry.count_logbooks === props.entry.count_schedules
})

const showCount = computed(() => {
  if (!props.entry) return false
  return props.entry.count_logbooks < props.entry.count_schedules
})

const cellStyle = computed(() => {
  if (!props.entry) return {}
  return { backgroundColor: props.entry.base_color }
})

const textColor = computed(() => {
  if (!props.entry) return undefined
  const hex = props.entry.base_color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#0E2138' : '#FFFFFF'
})
</script>

<template>
  <button
    class="day-cell"
    :class="{
      'day-cell--has-entry': !!entry,
      'day-cell--today': isToday,
      'day-cell--outside': !isCurrentMonth,
    }"
    :style="entry ? { ...cellStyle, color: textColor } : {}"
    @click="emit('select', day)"
  >
    <span class="day-cell__number">{{ day }}</span>

    <template v-if="entry">
      <span class="day-cell__badge" v-if="isCompleted">
        <Check :size="10" :stroke-width="3" />
      </span>
      <span class="day-cell__badge day-cell__badge--count" v-else-if="showCount">
        {{ entry.count_schedules }}
      </span>

      <span class="day-cell__duty-type">{{ entry.duty_type }}</span>
      <span class="day-cell__base">{{ entry.base_name }}</span>
    </template>
  </button>
</template>

<style lang="scss" scoped>
.day-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  border-radius: $radius-badge;
  background: transparent;
  cursor: pointer;
  padding: 2px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  min-width: 0;
  font-family: $font-family-base;

  &:active {
    transform: scale(0.93);
  }

  &--outside {
    opacity: 0.3;
    pointer-events: none;
  }

  &--today {
    box-shadow: inset 0 0 0 2px $color-navy;
  }

  &--has-entry {
    box-shadow: $shadow-card;

    &.day-cell--today {
      box-shadow: $shadow-card, inset 0 0 0 2px $color-navy;
    }
  }

  &__number {
    font-size: 11px;
    font-weight: $font-weight-bold;
    line-height: 1;
  }

  &__badge {
    position: absolute;
    top: 2px;
    right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    color: $color-text-primary;

    &--count {
      font-size: 9px;
      font-weight: $font-weight-bold;
      line-height: 1;
    }
  }

  &__duty-type {
    font-size: 10px;
    font-weight: $font-weight-bold;
    line-height: 1;
    margin-top: 2px;
    text-transform: uppercase;
  }

  &__base {
    font-size: 8px;
    font-weight: $font-weight-medium;
    line-height: 1;
    margin-top: 2px;
    text-transform: uppercase;
    opacity: 0.85;
  }
}
</style>
