import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  srcDir: 'src',
  filename: 'sw.ts',
  strategies: 'injectManifest',
  manifest: {
    name: 'Heroes 3 Tools',
    short_name: 'Heroes 3 Tools',
    description: 'Web tools for simplify calculations in Heroes of Might and Magic III: Horn of The Abyss',
    icons: [
      {
        src: 'favicon-196.png',
        sizes: '196x196',
        type: 'image/png',
      },
      {
        src: 'favicon-maskable-196.png',
        sizes: '196x196',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    id: '/',
    orientation: 'portrait-primary',
    background_color: '#eade90',
    theme_color: '#eade90',
    shortcuts: [
      {
        name: 'Damage Calculator',
        url: '/damage',
        icons: [
          {
            src: 'shortcuts/shortcut-damage-calculator-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Magic Calculator',
        url: '/magic',
        icons: [
          {
            src: 'shortcuts/shortcut-magic-calculator-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Library',
        url: '/library',
        icons: [
          {
            src: 'shortcuts/shortcut-library-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
    ],
    categories: ['games'],
  },
  includeAssets: ['robots.txt', 'sitemap.txt'],
  workbox: {
    sourcemap: true,
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [vue(), VitePWA(pwaOptions), vueI18n({ include: new URL('./src/locales/**', import.meta.url).toJSON() })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variables";
            @import "@/styles/mixins";
          `,
        },
      },
    },
    build: {
      sourcemap: true,
    },
    define: {
      'import.meta.env.__APP_VERSION__': JSON.stringify(env.npm_package_version),
    },
  }
})
