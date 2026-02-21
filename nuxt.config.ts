import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',

  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt'
  ],

  nitro: {
    preset: 'netlify',
    output: {
      publicDir: 'dist',
      serverDir: '.netlify/functions-internal'
    },
    // ✅ Костыль для бага с server.mjs
    hooks: {
      'compiled': async () => {
        const fs = await import('node:fs/promises')
        const path = await import('node:path')
        
        const serverDir = path.join(process.cwd(), '.netlify/functions-internal/server')
        await fs.mkdir(serverDir, { recursive: true })
        await fs.writeFile(path.join(serverDir, 'server.mjs'), '// empty file')
      }
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

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt'
  },

  ssr: true,

  plugins: [
    '~/plugins/msw.client.ts'
  ],

  runtimeConfig: {
    public: {
      mockEnabled: process.env.NUXT_PUBLIC_MOCK_ENABLED === 'true',
      environment: process.env.NODE_ENV || 'development'
    }
  }
})