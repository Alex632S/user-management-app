import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  nitro: {
    preset: 'netlify'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/users.test.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src') // добавляем тильду
    }
  }
})
