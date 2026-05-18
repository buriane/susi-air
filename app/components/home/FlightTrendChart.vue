<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { ChartToggle } from '~/types/flightHours'
import { useFlightHoursStore } from '~/stores/flightHours'
import { useToday } from '~/composables/useToday'
import { generateChartDataPoints } from '~/composables/useRollingHours'
import { buildChartConfig, createLimitLinePlugin } from '~/composables/useChartConfig'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const TOGGLES: { key: ChartToggle; label: string }[] = [
  { key: '1w', label: '1W' },
  { key: '1m', label: '1M' },
  { key: '3m', label: '3M' },
  { key: '6m', label: '6M' },
  { key: '1y', label: '1Y' },
]

const store = useFlightHoursStore()
const today = useToday()
const activeToggle = ref<ChartToggle>('1w')

const currentBound = computed(() => {
  if (!store.chartBounds) return null
  return store.chartBounds[activeToggle.value]
})

const dataPoints = computed(() => {
  if (!currentBound.value) return []
  return generateChartDataPoints(
    store.entries,
    today,
    currentBound.value.windowDays,
    currentBound.value.displayRangeDays
  )
})

const chartConfig = computed(() => {
  if (!currentBound.value || dataPoints.value.length === 0) return null
  return buildChartConfig(dataPoints.value, currentBound.value, today)
})

const limitPlugin = computed(() => {
  if (!currentBound.value) return null
  return createLimitLinePlugin(currentBound.value.limit)
})

const chartKey = ref(0)

function setToggle(toggle: ChartToggle) {
  activeToggle.value = toggle
  chartKey.value++
}
</script>

<template>
  <div class="flight-chart">
    <h3 class="flight-chart__title">Flight Hours Trend</h3>

    <div class="flight-chart__canvas-wrapper">
      <div v-if="chartConfig && limitPlugin" class="flight-chart__canvas">
        <Line
          :key="chartKey"
          :data="chartConfig.chartData"
          :options="chartConfig.chartOptions"
          :plugins="[limitPlugin]"
        />
      </div>
      <div v-else class="flight-chart__loading">
        <span>Loading chart…</span>
      </div>
    </div>

    <div class="flight-chart__toggles">
      <button
        v-for="toggle in TOGGLES"
        :key="toggle.key"
        class="flight-chart__toggle"
        :class="{ 'flight-chart__toggle--active': activeToggle === toggle.key }"
        @click="setToggle(toggle.key)"
      >
        {{ toggle.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flight-chart {
  &__title {
    font-size: $font-size-body;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: 16px;
  }

  &__canvas-wrapper {
    width: 100%;
    position: relative;
  }

  &__canvas {
    width: 100%;
    height: 200px;
    position: relative;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: $color-text-secondary;
    font-size: $font-size-body;
  }

  &__toggles {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
    background: rgba($color-text-secondary, 0.06);
    border-radius: $radius-pill;
    padding: 4px;
  }

  &__toggle {
    flex: 1;
    padding: 8px 0;
    border: none;
    background: transparent;
    border-radius: 20px;
    font-family: $font-family-base;
    font-size: $font-size-label;
    font-weight: $font-weight-bold;
    color: $color-text-secondary;
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.3px;

    &:active {
      transform: scale(0.95);
    }

    &--active {
      background: $color-bg-surface;
      color: $color-navy;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
