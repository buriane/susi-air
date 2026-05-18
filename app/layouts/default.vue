<script setup lang="ts">
import { usePilotStore } from '~/stores/pilot'
import { useFlightHoursStore } from '~/stores/flightHours'
import { useDocumentsStore } from '~/stores/documents'
import { useScheduleStore } from '~/stores/schedule'

const pilotStore = usePilotStore()
const flightHoursStore = useFlightHoursStore()
const documentsStore = useDocumentsStore()
const scheduleStore = useScheduleStore()

onMounted(() => {
  pilotStore.load()
  flightHoursStore.load()
  documentsStore.load()
  scheduleStore.load()
})
</script>

<template>
  <div class="default-layout">
    <LayoutAppHeader />
    <main class="default-layout__content">
      <slot />
    </main>
    <LayoutBottomNav />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: $color-bg-page;

  &__content {
    flex: 1;
    padding: 16px;
    padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
