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
        moduleResolution: 'bundler',
        types: ['node', 'vite/client'],
        paths: {
          '~/*': ['../*'],
          '@/*': ['./*']
        }
      }
    }
  },
  
  // Добавляем alias
  alias: {
    '~': '../',
    '@': './'
  },
  
  compatibilityDate: '2025-02-16'
})