import { createRouter, createWebHistory } from 'vue-router'
import learn from './learn.js'
import Home from '../views/home.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...learn,
  {
    path: '/:pathMatch(.*)',
    component: () => import('@views/404.vue'),
    name: '404',
    meta: { requireAuth: false }
  }
]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
