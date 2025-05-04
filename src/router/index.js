import { createRouter, createWebHistory } from 'vue-router'
import { debug } from '../utils/debug'

const isStaging = window.location.hostname === 'staging.grandkru.com'
const base = isStaging ? '/grandkru.com/' : '/'

debug.log('Router initialized with base:', base)

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ]
})

// Add navigation logging
router.beforeEach((to, from, next) => {
  debug.log('Navigation:', {
    from: from.path,
    to: to.path,
    params: to.params,
    query: to.query
  })
  next()
})

router.afterEach((to, from) => {
  debug.log('Navigation completed:', {
    from: from.path,
    to: to.path
  })
})

export default router
