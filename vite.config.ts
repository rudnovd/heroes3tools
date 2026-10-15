import type { VitePWAOptions } from 'vite-plugin-pwa'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueRouter from 'vue-router/vite'
import packageJson from './package.json' with { type: 'json' }

const pwaOptions: Partial<VitePWAOptions> = {
  manifest: {
    name: 'Heroes 3 tools',
    short_name: 'Heroes 3 tools',
    description:
      'Tools to make playing Heroes of Might and Magic III: Horn of The Abyss easier: damage calculator, magic calculator, creature library',
    orientation: 'portrait',
    theme_color: '#c0b675',
    background_color: '#c0b675',
    id: '/',
    icons: [
      {
        src: 'favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'favicon-maskable-192.png',
        sizes: '196x196',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  includeAssets: [
    'favicon.svg',
    'favicon.ico',
    'robots.txt',
    'sitemap.txt',
    'favicon-apple.png',
    'favicon-192.png',
    'favicon-maskable-192.png',
    'favicon-512.png',
  ],
}

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const IS_TAURI = env.VITE_IS_TAURI === 'true'
  return {
    plugins: [
      VueRouter({ importMode: IS_TAURI ? 'sync' : 'async' }),
      vue(),
      VitePWA({ ...pwaOptions, disable: IS_TAURI }),
      Icons(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
    },
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
    },
    clearScreen: !IS_TAURI,
    server: {
      port: 1420,
      strictPort: IS_TAURI,
      host: host || false,
      hmr: host
        ? {
            protocol: 'ws',
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  }
})
