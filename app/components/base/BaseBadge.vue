<script setup lang="ts">
defineProps<{
  variant: 'success' | 'warning' | 'danger' | 'neutral'
}>()
</script>

<template>
  <span
    class="base-badge"
    :class="`base-badge--${variant}`"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: $radius-badge;
  font-size: $font-size-label;
  font-weight: $font-weight-medium;
  line-height: 1.4;
  white-space: nowrap;

  &--success {
    background: rgba($color-success, 0.12);
    color: $color-success;
  }

  &--warning {
    background: rgba($color-warning, 0.12);
    color: $color-warning;
  }

  &--danger {
    background: rgba($color-danger, 0.12);
    color: $color-danger;
  }

  &--neutral {
    background: rgba($color-text-secondary, 0.10);
    color: $color-text-secondary;
  }
}
</style>
