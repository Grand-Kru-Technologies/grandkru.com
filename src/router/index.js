import { createRouter, createWebHistory } from 'vue-router'


const base = '/'

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
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Handle route parameter from HTML redirects
router.beforeEach((to, from, next) => {
  const route = to.query.route
  if (route) {
    next(route)
  } else {
    next()
  }
})

router.afterEach((to, from) => {

})

export default router
