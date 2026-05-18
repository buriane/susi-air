<script setup lang="ts">
</script>

<template>
  <div class="schedule-skeleton">
    <!-- Header skeleton -->
    <div class="schedule-skeleton__header">
      <div class="schedule-skeleton__header-icon" />
      <div class="schedule-skeleton__header-title" />
    </div>

    <!-- Navigation skeleton -->
    <div class="schedule-skeleton__nav">
      <div class="schedule-skeleton__btn" />
      <div class="schedule-skeleton__month" />
      <div class="schedule-skeleton__btn" />
    </div>

    <!-- Calendar grid skeleton -->
    <div class="schedule-skeleton__grid-card">
      <!-- Weekday headers -->
      <div class="schedule-skeleton__weekdays">
        <div v-for="i in 7" :key="i" class="schedule-skeleton__weekday" />
      </div>

      <!-- Day cells (5 rows x 7 columns) -->
      <div class="schedule-skeleton__days">
        <div v-for="i in 35" :key="i" class="schedule-skeleton__day" />
      </div>
    </div>

    <!-- Legend skeleton -->
    <div class="schedule-skeleton__legend-card">
      <div class="schedule-skeleton__legend-title" />
      <div class="schedule-skeleton__legend-grid">
        <div v-for="i in 10" :key="i" class="schedule-skeleton__legend-item">
          <div class="schedule-skeleton__swatch" />
          <div class="schedule-skeleton__legend-text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@mixin skeleton-pulse {
  background: linear-gradient(
    90deg,
    darken($color-bg-page, 2%) 25%,
    darken($color-bg-page, 5%) 50%,
    darken($color-bg-page, 2%) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 6px;
}

.schedule-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0;
  }

  &__header-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    @include skeleton-pulse;
  }

  &__header-title {
    width: 100px;
    height: 24px;
    border-radius: 6px;
    @include skeleton-pulse;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }

  &__btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    @include skeleton-pulse;
  }

  &__month {
    width: 140px;
    height: 22px;
    @include skeleton-pulse;
  }

  &__grid-card {
    background: $color-bg-surface;
    border-radius: $radius-card;
    box-shadow: $shadow-card;
    padding: 12px;
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

  &__weekday {
    height: 20px;
    @include skeleton-pulse;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  &__day {
    aspect-ratio: 1;
    border-radius: $radius-badge;
    @include skeleton-pulse;
  }

  &__legend-card {
    background: $color-bg-surface;
    border-radius: $radius-card;
    box-shadow: $shadow-card;
    padding: 16px;
  }

  &__legend-title {
    width: 90px;
    height: 16px;
    margin-bottom: 12px;
    @include skeleton-pulse;
  }

  &__legend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 16px;
  }

  &__legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__swatch {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
    @include skeleton-pulse;
  }

  &__legend-text {
    width: 80px;
    height: 12px;
    @include skeleton-pulse;
  }
}
</style>
