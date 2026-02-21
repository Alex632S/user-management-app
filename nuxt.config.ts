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
    preset: 'netlify',
    output: {
      publicDir: 'dist',
      serverDir: '.netlify/functions-internal'
    }
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt',
    cdnURL: ''
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  vite: {
    build: {
      cssCodeSplit: true,
      sourcemap: process.env.NODE_ENV !== 'production'
    }
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

  ssr: true,

  plugins: [
    '~/app/plugins/msw.client.ts'
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      mockEnabled: process.env.NUXT_PUBLIC_MOCK_ENABLED === 'true',
      environment: process.env.NODE_ENV || 'development'
    },
    apiSecret: process.env.NUXT_API_SECRET
  }
})