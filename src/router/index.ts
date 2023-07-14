import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MapEdit from '@/views/MapEdit.vue'
import MapList from '@/views/MapList.vue'
import AboutPage from '@/views/AboutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/edit/:id', component: MapEdit },
  { path: '/list/:type', component: MapList },
  // { path: '/share/:id', component: MapEdit },
  { path: '/about', component: AboutPage },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
