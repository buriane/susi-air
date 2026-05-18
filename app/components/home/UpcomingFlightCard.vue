<script setup lang="ts">
import { Plane, Clock, MapPin, CalendarDays } from 'lucide-vue-next'
import { format } from 'date-fns'
import { useToday } from '~/composables/useToday'

const today = useToday()

const flight = {
  date: today,
  departure: 'WIHH',
  departureCity: 'Jakarta',
  departureAirport: 'Halim Perdanakusuma',
  arrival: 'WICN',
  arrivalCity: 'Pangandaran',
  arrivalAirport: 'Nusawiru',
  departureTime: '08:30',
  arrivalTime: '10:15',
  aircraft: 'PK-BRM',
  flightNo: 'SI-284',
}

const formattedDate = computed(() => format(flight.date, 'EEEE, dd MMMM yyyy'))
</script>

<template>
  <section class="upcoming-flight">
    <h2 class="upcoming-flight__title">
      <Plane :size="18" :stroke-width="1.75" />
      Upcoming Flight
    </h2>

    <BaseCard class="upcoming-flight__card">
      <div class="upcoming-flight__header">
        <div class="upcoming-flight__flight-info">
          <span class="upcoming-flight__flight-no">{{ flight.flightNo }}</span>
          <BaseBadge variant="neutral">{{ flight.aircraft }}</BaseBadge>
        </div>
        <div class="upcoming-flight__date">
          <CalendarDays :size="14" :stroke-width="1.75" />
          {{ formattedDate }}
        </div>
      </div>

      <div class="upcoming-flight__route">
        <div class="upcoming-flight__airport">
          <span class="upcoming-flight__code">{{ flight.departure }}</span>
          <span class="upcoming-flight__city">{{ flight.departureCity }}</span>
          <span class="upcoming-flight__airport-name">{{ flight.departureAirport }}</span>
        </div>

        <div class="upcoming-flight__route-line">
          <div class="upcoming-flight__line" />
          <Plane :size="18" :stroke-width="1.75" class="upcoming-flight__plane-icon" />
          <div class="upcoming-flight__line" />
        </div>

        <div class="upcoming-flight__airport upcoming-flight__airport--end">
          <span class="upcoming-flight__code">{{ flight.arrival }}</span>
          <span class="upcoming-flight__city">{{ flight.arrivalCity }}</span>
          <span class="upcoming-flight__airport-name">{{ flight.arrivalAirport }}</span>
        </div>
      </div>

      <div class="upcoming-flight__times">
        <div class="upcoming-flight__time">
          <Clock :size="14" :stroke-width="1.75" />
          <span>{{ flight.departureTime }}</span>
        </div>
        <div class="upcoming-flight__time">
          <MapPin :size="14" :stroke-width="1.75" />
          <span>{{ flight.arrivalTime }}</span>
        </div>
      </div>
    </BaseCard>
  </section>
</template>

<style lang="scss" scoped>
.upcoming-flight {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__card {
    padding: 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__flight-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__flight-no {
    font-size: $font-size-body-lg;
    font-weight: $font-weight-bold;
    color: $color-navy;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: $font-size-label;
    color: $color-text-secondary;
  }

  &__route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  &__airport {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;

    &--end {
      align-items: flex-end;
      text-align: right;
    }
  }

  &__code {
    font-size: $font-size-title;
    font-weight: $font-weight-bold;
    color: $color-navy;
    line-height: 1.2;
  }

  &__city {
    font-size: $font-size-label;
    color: $color-text-secondary;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }

  &__airport-name {
    font-size: 11px;
    color: rgba($color-text-secondary, 0.7);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    margin-top: 2px;
  }

  &__route-line {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  &__line {
    flex: 1;
    height: 1px;
    background: rgba($color-text-secondary, 0.2);
  }

  &__plane-icon {
    color: $color-red;
    flex-shrink: 0;
    transform: rotate(0deg);
  }

  &__times {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid rgba($color-text-secondary, 0.08);
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-body;
    font-weight: $font-weight-bold;
    color: $color-text-primary;

    svg {
      color: $color-text-secondary;
    }
  }
}
</style>
