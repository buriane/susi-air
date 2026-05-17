<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)

function togglePasswordVisibility(): void {
  showPassword.value = !showPassword.value
}

async function handleSubmit(): Promise<void> {
  isSubmitting.value = true

  await new Promise((resolve) => setTimeout(resolve, 600))

  await router.push('/home')
}
</script>

<template>
  <div class="sign-in">
    <!-- Background orb shapes -->
    <div class="sign-in__bg-shape sign-in__bg-shape--top" />
    <div class="sign-in__bg-shape sign-in__bg-shape--bottom" />

    <div class="sign-in__container">
      <!-- Logo & Branding -->
      <div class="sign-in__header">
        <div class="sign-in__logo-wrapper">
          <img
            src="/susiair-logo.png"
            alt="Susi Air Logo"
            class="sign-in__logo"
          />
        </div>
        <h1 class="sign-in__title">Pilot Companion</h1>
        <p class="sign-in__subtitle">Sign in to access your flight data</p>
      </div>

      <!-- Sign In Form -->
      <form class="sign-in__form" @submit.prevent="handleSubmit">
        <div class="sign-in__field">
          <label for="signin-username" class="sign-in__label">Username</label>
          <div class="sign-in__input-wrapper">
            <svg
              class="sign-in__input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              id="signin-username"
              v-model="username"
              type="text"
              class="sign-in__input"
              placeholder="Enter your username"
              autocomplete="username"
            />
          </div>
        </div>

        <div class="sign-in__field">
          <label for="signin-password" class="sign-in__label">Password</label>
          <div class="sign-in__input-wrapper">
            <svg
              class="sign-in__input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              id="signin-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="sign-in__input"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="sign-in__toggle-password"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="togglePasswordVisibility"
            >
              <!-- Eye icon (show) -->
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <!-- Eye off icon (hide) -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
        </div>

        <BaseButton
          id="signin-submit"
          type="submit"
          variant="primary"
          full-width
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Sign In</span>
          <span v-else class="sign-in__loading">
            <span class="sign-in__spinner" />
            Signing in...
          </span>
        </BaseButton>
      </form>

      <!-- Help Link -->
      <div class="sign-in__footer">
        <p class="sign-in__help-text">
          Need help?
          <a href="#" class="sign-in__help-link">Contact CRD</a>
        </p>
      </div>
    </div>

    <!-- App version -->
    <p class="sign-in__version">v1.0.0 — Susi Air Pilot Companion</p>
  </div>
</template>

<style lang="scss" scoped>
.sign-in {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 24px 20px;
  background: $color-bg-page;
  overflow: hidden;

  // Decorative background orb shapes
  &__bg-shape {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--top {
      top: -120px;
      right: -80px;
      width: 280px;
      height: 280px;
      background: linear-gradient(
        135deg,
        rgba($color-navy, 0.06) 0%,
        rgba($color-red, 0.04) 100%
      );
    }

    &--bottom {
      bottom: -100px;
      left: -60px;
      width: 220px;
      height: 220px;
      background: linear-gradient(
        315deg,
        rgba($color-red, 0.05) 0%,
        rgba($color-navy, 0.03) 100%
      );
    }
  }

  &__container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 360px;
    animation: fadeInUp 0.6s ease-out;
  }

  // Logo & Branding
  &__header {
    text-align: center;
    margin-bottom: 36px;
  }

  &__logo-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    margin-bottom: 20px;
    border-radius: 24px;
    background: $color-bg-surface;
    box-shadow:
      0 4px 24px rgba($color-navy, 0.08),
      0 1px 4px rgba(0, 0, 0, 0.04);
  }

  &__logo {
    width: 72px;
    height: auto;
    object-fit: contain;
  }

  &__title {
    font-size: $font-size-title;
    font-weight: $font-weight-bold;
    color: $color-navy;
    margin-bottom: 6px;
    letter-spacing: -0.3px;
  }

  &__subtitle {
    font-size: $font-size-body;
    color: $color-text-secondary;
    font-weight: $font-weight-regular;
  }

  // Form
  &__form {
    background: $color-bg-surface;
    border-radius: $radius-card-lg;
    padding: 28px 24px;
    box-shadow: $shadow-card;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__label {
    font-size: $font-size-label;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input-icon {
    position: absolute;
    left: 14px;
    color: $color-text-secondary;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  &__input {
    width: 100%;
    padding: 14px 14px 14px 42px;
    font-size: $font-size-body-lg;
    font-weight: $font-weight-regular;
    color: $color-text-primary;
    background: $color-bg-page;
    border: 1.5px solid transparent;
    border-radius: $radius-card;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

    &::placeholder {
      color: rgba($color-text-secondary, 0.6);
    }

    &:focus {
      border-color: $color-navy;
      background: $color-bg-surface;
      box-shadow: 0 0 0 3px rgba($color-navy, 0.08);
    }

    &:focus ~ .sign-in__input-icon,
    &:focus + .sign-in__input-icon {
      color: $color-navy;
    }
  }

  // Make the focus change icon color via wrapper
  &__input:focus ~ .sign-in__toggle-password {
    color: $color-navy;
  }

  &__input-wrapper:focus-within {
    .sign-in__input-icon {
      color: $color-navy;
    }
  }

  &__toggle-password {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    color: $color-text-secondary;
    background: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: $color-navy;
      background: rgba($color-navy, 0.06);
    }
  }

  // Loading state
  &__loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  &__spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba($color-bg-surface, 0.3);
    border-top-color: $color-bg-surface;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  // Footer
  &__footer {
    text-align: center;
  }

  &__help-text {
    font-size: $font-size-body;
    color: $color-text-secondary;
  }

  &__help-link {
    color: $color-red;
    font-weight: $font-weight-medium;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  // Version
  &__version {
    position: absolute;
    bottom: 20px;
    font-size: $font-size-label;
    color: rgba($color-text-secondary, 0.5);
    text-align: center;
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
