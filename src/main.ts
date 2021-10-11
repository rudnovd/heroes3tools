import App from '@/App.vue'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import { createApp } from 'vue'

createApp(App).use(i18n).use(router).use(store).mount('#app')
