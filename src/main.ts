import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import i18n, { getAppLocale, setLocale } from '@/i18n'
import router from '@/router'

setLocale(getAppLocale()).then(() => {
  createApp(App).use(i18n).use(router).use(createPinia()).use(createHead()).mount('#app')
})
