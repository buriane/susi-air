<script setup lang="ts">

const pilotStore = usePilotStore()
const flightHoursStore = useFlightHoursStore()
const documentsStore = useDocumentsStore()
const scheduleStore = useScheduleStore()

pilotStore.load()
flightHoursStore.load()
documentsStore.load()
scheduleStore.load()

const today = useToday()
</script>

<template>
  <div class="foundation-check">
    <h1 class="text-title">Susi Air Pilot Companion</h1>

    <div class="foundation-check__section">
      <div class="foundation-check__card">
        <p class="text-label text-muted">Pilot Store</p>
        <p class="text-body">
          Name: <strong class="text-numeric">{{ pilotStore.name }}</strong>
        </p>
        <p class="text-body">
          Total Flight Hours: <strong class="text-numeric">{{ pilotStore.totalFlightHours }}</strong>
        </p>
      </div>

      <div class="foundation-check__card">
        <p class="text-label text-muted">Flight Hours Store</p>
        <p class="text-body">
          Entries: <strong class="text-numeric">{{ flightHoursStore.entries.length }}</strong>
        </p>
        <p class="text-body">
          Daily Limit: <strong class="text-numeric">{{ flightHoursStore.limits?.daily }}</strong>
        </p>
        <p class="text-body">
          Chart Bounds Keys: <strong class="text-numeric">{{ flightHoursStore.chartBounds ? Object.keys(flightHoursStore.chartBounds).join(', ') : 'N/A' }}</strong>
        </p>
      </div>

      <div class="foundation-check__card">
        <p class="text-label text-muted">Documents Store</p>
        <p class="text-body">
          Documents: <strong class="text-numeric">{{ documentsStore.documents.length }}</strong>
        </p>
        <p class="text-body">
          Warning Days: <strong class="text-numeric">{{ documentsStore.thresholds?.warningDays }}</strong>
        </p>
      </div>

      <div class="foundation-check__card">
        <p class="text-label text-muted">Schedule Store</p>
        <p class="text-body">
          Schedules: <strong class="text-numeric">{{ scheduleStore.schedules.length }}</strong>
        </p>
        <p class="text-body">
          Legend Items: <strong class="text-numeric">{{ scheduleStore.legend.length }}</strong>
        </p>
      </div>

      <div class="foundation-check__card">
        <p class="text-label text-muted">useToday()</p>
        <p class="text-body">
          Today: <strong class="text-numeric">{{ today.toISOString().slice(0, 10) }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.foundation-check {
  max-width: 390px;
  margin: 0 auto;
  padding: 24px 16px;

  &__section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__card {
    background: $color-bg-surface;
    border-radius: $radius-card;
    box-shadow: $shadow-card;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
