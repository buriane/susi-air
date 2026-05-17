<script setup lang="ts">
const props = defineProps<{
  value: number
  variant?: 'success' | 'warning' | 'danger' | 'neutral'
}>()

const clampedValue = computed(() => Math.max(0, Math.min(props.value, 100)))

const animatedWidth = ref(0)

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatedWidth.value = clampedValue.value
    })
  })
})

watch(clampedValue, (val) => {
  animatedWidth.value = val
})
</script>

<template>
  <div class="progress-bar">
    <div
      class="progress-bar__fill"
      :class="`progress-bar__fill--${variant ?? 'neutral'}`"
      :style="{ width: `${animatedWidth}%` }"
    />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba($color-text-secondary, 0.12);
  border-radius: 3px;
  overflow: hidden;

  &__fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.6s ease-out;

    &--success {
      background: $color-success;
    }

    &--warning {
      background: $color-warning;
    }

    &--danger {
      background: $color-danger;
    }

    &--neutral {
      background: $color-navy;
    }
  }
}
</style>
