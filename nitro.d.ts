import 'nuxt/config'

declare module 'nuxt/config' {
  interface NuxtConfig {
    nitro?: {
      preset?: string
      [key: string]: any
    }
  }
}
