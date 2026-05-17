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
  background: $color-bg-page;

  &__content {
    flex: 1;
    padding: 16px;
    padding-bottom: 80px;
    overflow-y: auto;
  }
}
</style>
