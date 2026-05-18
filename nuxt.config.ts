// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  nitro: {
    preset: 'vercel'
  },

  ssr: false,

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
          additionalData: '@use "sass:color"; @use "~/assets/scss/_variables" as *;',
          silenceDeprecations: ['import'],
        },
      },
    },
  },

  css: ['~/assets/scss/main.scss'],
})
