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

  css: ['./app/assets/css/main.css'],

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

  ssr: true
})
