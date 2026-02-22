import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-02-22',
  devtools: { enabled: true },
  ssr: true,
  srcDir: 'app/',

  modules: [
    '@netlify/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt'
  ],

  nitro: {
    preset: 'netlify'
  },

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
          '~/*': ['../*'],
          '@/*': ['./*']
        }
      }
    }
  },

  alias: {
    '~': '../',
    '@': './'
  }
})