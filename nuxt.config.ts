import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',

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

  compatibilityDate: '2025-02-16'
})
