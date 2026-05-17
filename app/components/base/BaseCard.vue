<script setup lang="ts">
defineProps<{
  padding?: string
}>()
</script>

<template>
  <div class="base-card" :style="padding ? { padding } : undefined">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-card {
  background: $color-bg-surface;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
  padding: 16px;
}
</style>
