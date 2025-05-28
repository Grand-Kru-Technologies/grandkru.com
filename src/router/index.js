import { createRouter, createWebHistory } from 'vue-router'

const base = import.meta.env.BASE_URL || '/'

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Home - Grand Kru Technologies'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Us - Grand Kru Technologies'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us - Grand Kru Technologies'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

// Handle route parameter from HTML redirects and update page title
router.beforeEach((to, from, next) => {
  // Handle route parameter from HTML redirects
  const route = to.query.route
  if (route) {
    next(route)
    return
  }

  // Update page title
  document.title = to.meta.title || 'Grand Kru Technologies'

  // Continue navigation
  next()
})

// Handle scroll behavior
router.afterEach((to, from) => {
  // Scroll to top on route change
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

export default router
