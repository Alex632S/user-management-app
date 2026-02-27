import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',
  modules: [
    [
      '@nuxt/eslint',
      {
        config: {
          stylistic: {
            semi: false,
            singleQuote: true,
            commaDangle: 'none',
            printWidth: 100,
            bracketSpacing: true,
            arrowParens: true
          }
        }
      }
    ],
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VForm',
          Field: 'VField',
          FieldArray: 'VFieldArray',
          ErrorMessage: 'VErrorMessage'
        }
      }
    ]
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
    viewer: true
  },

  vite: {
    plugins: []
  },

  nitro: {
    preset: 'netlify'
  },

  compatibilityDate: '2024-07-03',

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  ssr: true, // глобально SSR по умолчанию

  routeRules: {
    // Публичная часть - SSR для SEO
    '/': { ssr: true },
    '/blog/**': { ssr: true },
    '/products/**': { ssr: true },

    // CMS часть - SPA (быстрее загрузка, не нужно SEO)
    '/admin/**': {
      ssr: false,
      // Дополнительные опции
      swr: false // не кэшировать
    },
    '/cms/**': { ssr: false },

    // Статические страницы можно пререндерить
    '/about': { prerender: true },
    '/contacts': { prerender: true },

    // API маршруты
    '/api/**': { cors: true }
  },

  // Оптимизация для SPA части
  spaLoadingTemplate: true // показывать лоадер при загрузке SPA
})
