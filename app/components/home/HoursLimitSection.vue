<script setup lang="ts">
import { Timer } from 'lucide-vue-next'
import { useFlightHoursStore } from '~/stores/flightHours'
import { useToday } from '~/composables/useToday'
import { rollingSum } from '~/composables/useRollingHours'

const store = useFlightHoursStore()
const today = useToday()

interface LimitCardData {
  label: string
  hours: number
  limit: number
  window: string
}

const cards = computed<LimitCardData[]>(() => {
  if (!store.limits) return []

  const entries = store.entries

  return [
    {
      label: 'Daily',
      hours: rollingSum(entries, today, 1),
      limit: store.limits.daily,
      window: 'Today',
    },
    {
      label: 'Weekly',
      hours: rollingSum(entries, today, 7),
      limit: store.limits.weekly,
      window: 'Rolling 7 days',
    },
    {
      label: 'Monthly',
      hours: rollingSum(entries, today, 30),
      limit: store.limits.monthly,
      window: 'Rolling 30 days',
    },
    {
      label: 'Annual',
      hours: rollingSum(entries, today, 365),
      limit: store.limits.annual,
      window: 'Rolling 365 days',
    },
  ]
})
</script>

<template>
  <section class="hours-limit">
    <h2 class="hours-limit__heading">
      <Timer :size="18" :stroke-width="1.75" />
      Hours to Limit
    </h2>

    <div class="hours-limit__cards">
      <HomeHoursLimitCard
        v-for="card in cards"
        :key="card.label"
        :label="card.label"
        :hours="card.hours"
        :limit="card.limit"
        :window="card.window"
      />
    </div>

    <BaseCard padding="16px 12px">
      <HomeFlightTrendChart />
    </BaseCard>
  </section>
</template>

<style scoped lang="scss">
.hours-limit {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__heading {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media (min-width: 480px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
