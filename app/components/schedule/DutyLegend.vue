<script setup lang="ts">
import type { LegendItem } from '~/types/schedule'

defineProps<{
  legend: LegendItem[]
}>()
</script>

<template>
  <div class="duty-legend">
    <h3 class="duty-legend__title">Duty Types</h3>
    <div class="duty-legend__grid">
      <div
        v-for="item in legend"
        :key="item.code"
        class="duty-legend__item"
      >
        <span
          class="duty-legend__swatch"
          :style="{ backgroundColor: item.color }"
        />
        <span class="duty-legend__code">{{ item.code }}</span>
        <span class="duty-legend__label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.duty-legend {
  background: $color-bg-surface;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
  padding: 16px;

  &__title {
    font-family: $font-family-base;
    font-size: $font-size-body;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin: 0 0 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  &__swatch {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }

  &__code {
    font-family: $font-family-base;
    font-size: $font-size-label;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    flex-shrink: 0;
  }

  &__label {
    font-family: $font-family-base;
    font-size: $font-size-label;
    font-weight: $font-weight-regular;
    color: $color-text-secondary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
