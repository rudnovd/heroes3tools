import { createApp } from 'vue'
import App from '@/App.vue'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'

createApp(App).use(i18n).use(router).use(store).mount('#app')
