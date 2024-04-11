import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import UnheadVite from '@unhead/addons/vite'

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
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "sass:map";
          @import "@/styles/variables";
          @import "@/styles/mixins";
        `,
      },
    },
  },
  define: {
    'import.meta.env.__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 5555,
  },
})
