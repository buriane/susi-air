<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentMonth: Date
}>()

const emit = defineEmits<{
  prev: []
  next: []
}>()

const monthLabel = computed(() => format(props.currentMonth, 'MMMM yyyy'))
</script>

<template>
  <div class="calendar-nav">
    <button
      class="calendar-nav__btn"
      aria-label="Previous month"
      @click="emit('prev')"
    >
      <ChevronLeft :size="20" :stroke-width="2" />
    </button>

    <span class="calendar-nav__label">{{ monthLabel }}</span>

    <button
      class="calendar-nav__btn"
      aria-label="Next month"
      @click="emit('next')"
    >
      <ChevronRight :size="20" :stroke-width="2" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;

  &__label {
    font-family: $font-family-base;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    user-select: none;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: $color-bg-surface;
    box-shadow: $shadow-card;
    color: $color-text-primary;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;

    &:hover {
      background: color.adjust(#F5F6F8, $lightness: -4%);
    }

    &:active {
      transform: scale(0.92);
    }
  }
}
</style>
