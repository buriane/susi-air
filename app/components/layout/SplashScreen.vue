<template>
  <div class="splash-screen">
    <div class="splash-screen__content">
      <img src="/susiair-logo.png" alt="Susi Air Logo" class="splash-screen__logo" />
      <div class="splash-screen__loader"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: $color-bg-surface;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  &__logo {
    width: 200px;
    height: auto;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  &__loader {
    width: 32px;
    height: 32px;
    border: 3px solid rgba($color-text-secondary, 0.2);
    border-top-color: $color-navy;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
</style>
