import App from '@/App.vue'
import i18n from '@/i18n'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

createApp(App).use(i18n).use(router).use(createPinia()).mount('#app')
