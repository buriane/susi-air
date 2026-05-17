<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="sign-in-placeholder">
    <p class="text-body text-muted">Sign In page</p>
    <NuxtLink to="/home" class="text-link">Go to Home →</NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.sign-in-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  background: $color-bg-page;
}
</style>
