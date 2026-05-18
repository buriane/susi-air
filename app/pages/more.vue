<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'

const router = useRouter()
const showLogoutModal = ref(false)

const handleLogoutClick = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  showLogoutModal.value = false
  router.push('/')
}

const cancelLogout = () => {
  showLogoutModal.value = false
}
</script>

<template>
  <div class="more-page">
    <div class="more-page__header">
      <MoreHorizontal :size="20" :stroke-width="1.5" />
      <h1 class="text-title">More</h1>
    </div>
    
    <div class="more-page__content">
      <BaseButton variant="secondary" @click="handleLogoutClick">
        Log Out
      </BaseButton>
    </div>

    <!-- Modal Overlay -->
    <div v-if="showLogoutModal" class="modal-overlay">
      <BaseCard class="modal-content">
        <h3 class="modal-title">Log Out</h3>
        <p class="modal-text">Are you sure you want to log out?</p>
        <div class="modal-actions">
          <BaseButton variant="secondary" @click="cancelLogout" class="modal-btn">No</BaseButton>
          <BaseButton variant="primary" @click="confirmLogout" class="modal-btn modal-btn--danger">Yes</BaseButton>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.more-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $color-text-primary;

    .text-title {
      margin: 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba($color-navy, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-content {
  width: 100%;
  max-width: 320px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-title {
  margin: 0;
  font-size: $font-size-headline;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.modal-text {
  margin: 0;
  font-size: $font-size-body;
  color: $color-text-secondary;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.modal-btn {
  flex: 1;

  &--danger {
    background: $color-red;
    color: white;
    border-color: $color-red;
  }
}
</style>
