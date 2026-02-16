import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('../../mocks/browser')

      await worker.start({
        onUnhandledRequest: 'bypass',
        quiet: false
      })

      console.log('✅ MSW mock server started successfully')
    } catch (error) {
      console.error('Failed to start MSW:', error)
    }
  }
})
