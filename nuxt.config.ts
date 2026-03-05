import { defineNuxtConfig } from 'nuxt/config'

export const nitro = {
  presets: ['netlify'],
  routeRules: {
    '/': { ssr: true },
    '/admin/**': {
      ssr: false,
      swr: false
    },
    '/api/**': { cors: true }
  }
}

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    [
      '@nuxt/eslint',
      {
        config: {
          stylistic: false
        }
      }
    ],
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    ...(process.env.NUXT_PUBLIC_NETLIFY_ENABLED === 'true'
      ? ['@netlify/nuxt']
      : [])
  ],
  ssr: true,
  devtools: { enabled: true },
  spaLoadingTemplate: true,
  srcDir: 'app/',
  compatibilityDate: '2024-07-03',
  vite: {
    plugins: []
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  }
})
