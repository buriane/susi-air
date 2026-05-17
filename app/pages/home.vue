<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePilotStore } from '~/stores/pilot'
import { useDocumentsStore } from '~/stores/documents'

const pilotStore = usePilotStore()
const documentsStore = useDocumentsStore()

const isSimulatingLoad = ref(true)

onMounted(() => {
  setTimeout(() => {
    isSimulatingLoad.value = false
  }, 800)
})

const isLoaded = computed(() =>
  pilotStore.name !== '' && documentsStore.documents.length > 0 && !isSimulatingLoad.value
)
</script>

<template>
  <div class="home-page">
    <template v-if="isLoaded">
      <HomeUpcomingFlightCard />
      <HomeLatestNewsScroll />
      <HomeDocumentList />
    </template>

    <template v-else>
      <HomeSkeleton />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
