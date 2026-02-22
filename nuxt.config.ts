import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',

  modules: [
    '@netlify/nuxt',
    '@pinia/nuxt',
    ['@vee-validate/nuxt', {
      autoImports: true,
      componentNames: {
        Form: 'VForm',
        Field: 'VField',
        FieldArray: 'VFieldArray',
        ErrorMessage: 'VErrorMessage'
      }
    }]
  ],

  nitro: {
    preset: 'netlify'
  },

  compatibilityDate: '2025-02-22',

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'Bundler',
        types: ['node', 'vite/client'],
        paths: {
          '@/*': ['./*']
        }
      }
    }
  },

  ssr: true
})