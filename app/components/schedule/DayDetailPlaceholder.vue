<script setup lang="ts">
import { computed } from "vue";
import { format } from "date-fns";
import { X, CalendarDays } from "lucide-vue-next";

const props = defineProps<{
  date: Date;
}>();

const emit = defineEmits<{
  close: [];
}>();

const formattedDate = computed(() => format(props.date, "EEEE, MMMM d, yyyy"));
</script>

<template>
  <Teleport to="body">
    <div class="day-detail-overlay" @click.self="emit('close')">
      <div class="day-detail">
        <div class="day-detail__header">
          <div class="day-detail__title-row">
            <CalendarDays :size="20" :stroke-width="1.5" />
            <span class="day-detail__title">Schedule Detail</span>
          </div>
          <button
            class="day-detail__close"
            aria-label="Close"
            @click="emit('close')"
          >
            <X :size="20" :stroke-width="2" />
          </button>
        </div>

        <div class="day-detail__body">
          <p class="day-detail__date">{{ formattedDate }}</p>
          <div class="day-detail__placeholder">
            <span class="day-detail__emoji">🚧</span>
            <p class="day-detail__message">Detail page coming soon</p>
            <p class="day-detail__sub">
              Detailed schedule view will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.day-detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(14, 33, 56, 0.4);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

.day-detail {
  width: 100%;
  max-width: 420px;
  background: $color-bg-surface;
  border-radius: $radius-card-lg $radius-card-lg 0 0;
  padding: 20px 20px 32px;
  animation: slideUp 0.25s ease;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;
  }

  &__title {
    font-family: $font-family-base;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: $color-bg-page;
    color: $color-text-secondary;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: color.adjust(#f5f6f8, $lightness: -6%);
    }
  }

  &__body {
    text-align: center;
  }

  &__date {
    font-family: $font-family-base;
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    margin: 0 0 24px;
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 0;
  }

  &__emoji {
    font-size: 40px;
    line-height: 1;
  }

  &__message {
    font-family: $font-family-base;
    font-size: $font-size-body-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin: 0;
  }

  &__sub {
    font-family: $font-family-base;
    font-size: $font-size-body;
    font-weight: $font-weight-regular;
    color: $color-text-secondary;
    margin: 0;
    max-width: 260px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
