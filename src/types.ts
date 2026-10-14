import type { HeadData } from './utilities'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    head: HeadData
  }
}
