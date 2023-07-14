import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, 
})
createApp(App).use(i18n).use(router).mount('#app')
