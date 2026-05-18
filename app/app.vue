<script setup lang="ts">
const isLoading = ref(true)

useHead({
  title: 'Susi Air Pilot Companion',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: '#0E2138'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    }
  ],
  link: [
    {
      rel: 'manifest',
      href: '/manifest.json'
    },
    {
      rel: 'apple-touch-icon',
      href: '/susiair-logo.png'
    }
  ]
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <div id="app-root">
    <Transition name="fade">
      <LayoutSplashScreen v-if="isLoading" />
    </Transition>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
      }" />
    </NuxtLayout>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
