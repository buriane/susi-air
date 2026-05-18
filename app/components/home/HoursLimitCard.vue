<script setup lang="ts">
const props = defineProps<{
  label: string
  hours: number
  limit: number
  window: string
}>()

const percentage = computed(() =>
  Math.min(Math.round((props.hours / props.limit) * 100), 100)
)

const remaining = computed(() =>
  Math.max(props.limit - props.hours, 0)
)

const variant = computed(() => {
  const pct = (props.hours / props.limit) * 100
  if (pct >= 90) return 'danger'
  if (pct >= 70) return 'warning'
  return 'success'
})
</script>

<template>
  <div class="hours-card">
    <span class="hours-card__label">{{ label }}</span>
    <div class="hours-card__value">
      <span class="hours-card__hours">{{ hours.toFixed(1) }}</span>
      <span class="hours-card__separator">/</span>
      <span class="hours-card__limit">{{ limit }}h</span>
    </div>
    <BaseProgressBar :value="percentage" :variant="variant" />
    <div class="hours-card__footer">
      <span class="hours-card__remaining">{{ remaining.toFixed(1) }}h left</span>
      <span class="hours-card__window">{{ window }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hours-card {
  background: $color-bg-surface;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__label {
    font-size: $font-size-label;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__value {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  &__hours {
    font-size: 20px;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: 1;
  }

  &__separator {
    font-size: $font-size-body;
    color: $color-text-secondary;
    margin: 0 1px;
  }

  &__limit {
    font-size: $font-size-label;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
  }

  &__remaining {
    font-size: 11px;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__window {
    font-size: 10px;
    color: $color-text-secondary;
  }
}
</style>
