import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import i18n from './i18n'


createApp(App).use(i18n).use(router).mount('#app')
