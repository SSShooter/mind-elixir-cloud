import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MapEdit from '@/views/MapEdit.vue'
import MapShare from '@/views/MapShare.vue'
import MapList from '@/views/MapList.vue'
import AboutPage from '@/views/AboutPage.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/edit/:id', component: MapEdit },
  { path: '/list/:type', component: MapList },
  { path: '/share/:id', component: MapShare },
  { path: '/about', component: AboutPage },
  { path: '/404', component: PageNotFound },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
