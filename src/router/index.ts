import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthService } from '../services/authService'

const routes: Array<RouteRecordRaw> = [
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
    path: '/services',
    name: 'services',
    component: () => import('../views/ServicesView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../components/admin/AdminLogin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth) {
    if (!AuthService.isAuthenticated()) {
      next('/admin/login')
      return
    }

    if (requiresAdmin && !AuthService.isAdmin()) {
      next('/')
      return
    }
  }

  // Redirect authenticated users away from login page
  if (to.name === 'admin-login' && AuthService.isAuthenticated()) {
    next('/admin')
    return
  }

  next()
})

export default router