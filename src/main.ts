import App from '@/App.vue'
import i18n from '@/i18n'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'

createApp(App).use(i18n).use(router).use(createPinia()).use(createHead()).mount('#app')
