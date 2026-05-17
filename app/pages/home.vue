<script setup lang="ts">
</script>

<template>
  <div class="home-page">
    <h2 class="text-headline">Dashboard</h2>

    <section class="home-page__preview">
      <BaseCard>
        <p class="text-body">BaseCard</p>
      </BaseCard>

      <div class="home-page__badges">
        <BaseBadge variant="success">Active</BaseBadge>
        <BaseBadge variant="warning">Expiring</BaseBadge>
        <BaseBadge variant="danger">Expired</BaseBadge>
        <BaseBadge variant="neutral">Neutral</BaseBadge>
      </div>

      <div class="home-page__buttons">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
      </div>

      <BaseCard>
        <p class="text-label text-muted" style="margin-bottom: 8px;">Progress Bars</p>
        <div class="home-page__progress-list">
          <BaseProgressBar :value="35" variant="success" />
          <BaseProgressBar :value="65" variant="warning" />
          <BaseProgressBar :value="90" variant="danger" />
        </div>
      </BaseCard>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__preview {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__buttons {
    display: flex;
    gap: 12px;
  }

  &__progress-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
