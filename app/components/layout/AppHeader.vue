<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { usePilotStore } from '~/stores/pilot'

const pilotStore = usePilotStore()

const notificationCount = ref(3)
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <BaseAvatar :name="pilotStore.name" :size="42" />
      <div class="app-header__info">
        <p class="app-header__greeting">Hello,</p>
        <h1 class="app-header__name">{{ pilotStore.name }}</h1>
      </div>
    </div>

    <div class="app-header__right">
      <div class="app-header__hours">
        <span class="app-header__hours-value">{{ pilotStore.totalFlightHours.toLocaleString() }}</span>
        <span class="app-header__hours-label">Total Hours</span>
      </div>

      <button class="app-header__bell" aria-label="Notifications">
        <Bell :size="22" :stroke-width="1.75" />
        <span
          v-if="notificationCount > 0"
          class="app-header__bell-badge"
        >
          {{ notificationCount }}
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: $color-bg-surface;
  border-bottom: 1px solid rgba($color-text-secondary, 0.08);

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__greeting {
    font-size: $font-size-label;
    color: $color-text-secondary;
    line-height: 1.3;
  }

  &__name {
    font-size: $font-size-body-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: 1.3;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__hours {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__hours-value {
    font-size: $font-size-body-lg;
    font-weight: $font-weight-bold;
    color: $color-navy;
    line-height: 1.3;
  }

  &__hours-label {
    font-size: $font-size-label;
    color: $color-text-secondary;
    line-height: 1.3;
  }

  &__bell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $color-navy;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba($color-navy, 0.06);
    }
  }

  &__bell-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background: $color-danger;
    color: $color-bg-surface;
    font-size: 10px;
    font-weight: $font-weight-bold;
    border-radius: 9px;
    line-height: 1;
  }
}
</style>
