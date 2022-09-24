import App from '@/App.vue'
import i18n from '@/i18n'
import router from '@/router'
import pinia from '@/store'
import '@/styles/main.scss'
import { createApp } from 'vue'

createApp(App).use(i18n).use(router).use(pinia).mount('#app')
