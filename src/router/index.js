import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@v/404/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/',
    name: 'pc',
    component: () => import('@v/pc/pc.vue'),
    meta: {
      title: 'pc端'
    }
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@v/app/app.vue'),
    meta: {
      title: '移动端'
    }
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]
const router = new Router({
  mode: 'history',
  routes: routes
})
export default router
