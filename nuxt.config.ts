import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  srcDir: 'app/',


    nitro: {
    output: {
      dir: '.output', 
    }
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

  hooks: {
  'build:done': () => {
    console.log('✅ Build completed! Output directories:')
    console.log('- .output should exist')
    console.log('- .nuxt should exist')
  },

  alias: {
    '~': '../',
    '@': './'
  },

  compatibilityDate: '2025-02-16'
})
