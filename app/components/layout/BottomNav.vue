<script setup lang="ts">
import { Home, Calendar, BookOpen, MoreHorizontal } from 'lucide-vue-next'

const route = useRoute()

interface NavItem {
  label: string
  icon: typeof Home
  to?: string
  placeholder?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, to: '/home' },
  { label: 'Schedule', icon: Calendar, to: '/schedule' },
  { label: 'Logbook', icon: BookOpen, placeholder: true },
  { label: 'More', icon: MoreHorizontal, placeholder: true },
]

const isActive = (item: NavItem): boolean => {
  if (!item.to) return false
  return route.path === item.to
}
</script>

<template>
  <nav class="bottom-nav" aria-label="Main navigation">
    <template v-for="item in navItems" :key="item.label">
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="bottom-nav__item"
        :class="{ 'bottom-nav__item--active': isActive(item) }"
      >
        <component :is="item.icon" :size="22" :stroke-width="1.75" class="bottom-nav__icon" />
        <span class="bottom-nav__label">{{ item.label }}</span>
      </NuxtLink>

      <button
        v-else
        class="bottom-nav__item"
        type="button"
      >
        <component :is="item.icon" :size="22" :stroke-width="1.75" class="bottom-nav__icon" />
        <span class="bottom-nav__label">{{ item.label }}</span>
      </button>
    </template>
  </nav>
</template>

<style scoped lang="scss">
.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: $color-bg-surface;
  border-top: 1px solid rgba($color-text-secondary, 0.1);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.04);
  padding-bottom: env(safe-area-inset-bottom, 0);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    height: 100%;
    color: $color-text-secondary;
    transition: color 0.2s ease;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      color: $color-navy;
    }

    &--active,
    &--active:hover {
      color: $color-red;
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__label {
    font-size: 11px;
    font-weight: $font-weight-medium;
    line-height: 1;
  }
}
</style>
