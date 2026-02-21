import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',

  modules: [
    '@netlify/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt'
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
          '~/*': ['../*'],
          '@/*': ['./*']
        }
      }
    }
  },

  alias: {
    '~': '../',
    '@': './'
  },

  ssr: true
})