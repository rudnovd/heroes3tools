import type { VitePWAOptions } from 'vite-plugin-pwa'
import path from 'node:path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnheadVite from '@unhead/addons/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
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
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  manifest: {
    name: 'Heroes 3 tools',
    short_name: 'Heroes 3 tools',
    description:
      'Tools to make playing Heroes of Might and Magic III: Horn of The Abyss easier: damage calculator, magic calculator, creature library',
    orientation: 'portrait',
    theme_color: '#c0b675',
    background_color: '#c0b675',
    start_url: '/',
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
  workbox: {
    sourcemap: true,
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaOptions),
    VueI18nPlugin({ include: path.resolve(__dirname, './src/locales/*.json') }),
    UnheadVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5555,
  },
})
