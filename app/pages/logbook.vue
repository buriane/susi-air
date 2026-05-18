<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
</script>

<template>
  <div class="logbook-page">
    <div class="logbook-page__header">
      <BookOpen :size="20" :stroke-width="1.5" />
      <h1 class="text-title">Logbook</h1>
    </div>
    
    <div class="logbook-page__content">
      <p class="text-secondary">Logbook features coming soon.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logbook-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;

    .text-title {
      margin: 0;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
  }
}
</style>
