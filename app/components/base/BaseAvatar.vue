<script setup lang="ts">
const props = defineProps<{
  name?: string
  src?: string
  size?: number
}>()

const avatarSize = computed(() => `${props.size ?? 40}px`)

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})
</script>

<template>
  <div
    class="base-avatar"
    :style="{ width: avatarSize, height: avatarSize }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="name ?? 'Avatar'"
      class="base-avatar__image"
    />
    <span v-else class="base-avatar__initials">
      {{ initials }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: $color-navy;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__initials {
    color: $color-bg-surface;
    font-size: $font-size-label;
    font-weight: $font-weight-bold;
    line-height: 1;
    user-select: none;
  }
}
</style>
