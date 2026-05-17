<script setup lang="ts">
</script>

<template>
  <div class="home-skeleton">
    <!-- Upcoming Flight Skeleton -->
    <section class="home-skeleton__section">
      <div class="home-skeleton__title skeleton" style="width: 160px;" />
      <BaseCard class="home-skeleton__card" style="height: 164px;">
        <div class="home-skeleton__header">
          <div class="skeleton" style="width: 80px; height: 24px; border-radius: 6px;" />
          <div class="skeleton" style="width: 120px; height: 16px; border-radius: 4px;" />
        </div>
        <div class="home-skeleton__body">
          <div class="skeleton" style="width: 100%; height: 48px; border-radius: 8px;" />
        </div>
        <div class="home-skeleton__footer">
          <div class="skeleton" style="width: 60px; height: 20px; border-radius: 4px;" />
          <div class="skeleton" style="width: 60px; height: 20px; border-radius: 4px;" />
        </div>
      </BaseCard>
    </section>

    <!-- Latest News Skeleton -->
    <section class="home-skeleton__section">
      <div class="home-skeleton__title-row">
        <div class="home-skeleton__title skeleton" style="width: 120px;" />
        <div class="skeleton" style="width: 60px; height: 16px; border-radius: 4px;" />
      </div>
      <div class="home-skeleton__scroll-container">
        <div class="home-skeleton__scroll">
          <BaseCard v-for="i in 2" :key="i" class="home-skeleton__news-card">
            <div class="home-skeleton__news-header">
              <div class="skeleton" style="width: 80px; height: 20px; border-radius: 4px;" />
              <div class="skeleton" style="width: 60px; height: 14px; border-radius: 4px;" />
            </div>
            <div class="skeleton" style="width: 100%; height: 20px; border-radius: 4px; margin-top: 8px;" />
            <div class="skeleton" style="width: 70%; height: 20px; border-radius: 4px; margin-top: 4px;" />
            <div class="skeleton" style="width: 100%; height: 14px; border-radius: 4px; margin-top: 8px;" />
            <div class="skeleton" style="width: 40%; height: 14px; border-radius: 4px; margin-top: 4px;" />
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Document Status Skeleton -->
    <section class="home-skeleton__section">
      <div class="home-skeleton__title skeleton" style="width: 140px;" />
      <div class="home-skeleton__list">
        <BaseCard v-for="i in 4" :key="i" class="home-skeleton__doc-card">
          <div class="home-skeleton__doc-left">
            <div class="skeleton" style="width: 36px; height: 36px; border-radius: 10px;" />
            <div class="home-skeleton__doc-info">
              <div class="skeleton" style="width: 140px; height: 20px; border-radius: 4px;" />
              <div class="skeleton" style="width: 90px; height: 14px; border-radius: 4px;" />
            </div>
          </div>
          <div class="home-skeleton__doc-right">
            <div class="skeleton" style="width: 60px; height: 22px; border-radius: 8px;" />
            <div class="skeleton" style="width: 50px; height: 12px; border-radius: 4px;" />
          </div>
        </BaseCard>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  background: rgba($color-text-secondary, 0.12);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.home-skeleton {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    height: 22px;
    border-radius: 6px;
  }

  &__title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__card {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__body {
    margin-bottom: 16px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba($color-text-secondary, 0.08);
  }

  &__scroll-container {
    margin-left: -16px;
    margin-right: -16px;
    overflow: hidden;
  }

  &__scroll {
    display: flex;
    gap: 12px;
    padding: 4px 16px;
    overflow-x: hidden;
  }

  &__news-card {
    flex-shrink: 0;
    width: 260px;
    padding: 14px;
    display: flex;
    flex-direction: column;
  }

  &__news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__doc-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
  }

  &__doc-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  &__doc-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__doc-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }
}
</style>
