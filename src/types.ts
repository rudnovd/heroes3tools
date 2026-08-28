import type { Locale } from 'vue-i18n'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    head: {
      [key: Locale]: {
        title: string
        description: string
        image: string
        locale: string
        url: string
      }
    }
  }
}
