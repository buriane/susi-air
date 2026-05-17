// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Inter: [400, 500, 700],
      'Plus Jakarta Sans': [400, 500, 700],
    },
    display: 'swap',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables" as *;',
          silenceDeprecations: ['import'],
        },
      },
    },
  },

  css: ['~/assets/scss/main.scss'],
})
