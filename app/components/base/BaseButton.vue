<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="base-button"
    :class="[
      `base-button--${variant ?? 'primary'}`,
      { 'base-button--full-width': fullWidth }
    ]"
    :type="type ?? 'button'"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  line-height: 1.4;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: $color-red;
    color: $color-bg-surface;
    border-radius: $radius-pill;

    &:hover:not(:disabled) {
      opacity: 0.9;
      box-shadow: 0 4px 12px rgba($color-red, 0.3);
    }

    &:active:not(:disabled) {
      opacity: 0.85;
    }
  }

  &--secondary {
    background: transparent;
    color: $color-navy;
    border: 1.5px solid $color-navy;
    border-radius: $radius-pill;

    &:hover:not(:disabled) {
      background: rgba($color-navy, 0.06);
    }

    &:active:not(:disabled) {
      background: rgba($color-navy, 0.1);
    }
  }

  &--full-width {
    width: 100%;
  }
}
</style>
