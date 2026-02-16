import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  if (import.meta.dev) {
    try {
      console.log('📡 Starting MSW mock server...')

      const { worker } = await import('../../mocks/browser')

      await worker.start({
        onUnhandledRequest: 'bypass',
        quiet: false,
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })

      console.log('✅ MSW mock server started successfully')
    } catch (error) {
      console.error('❌ Failed to start MSW:', error)
    }
  }
})
