import { createRouter, createMemoryHistory, Router } from 'vue-router'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { handleRedirect } from '../utils/router'
import { vi, beforeEach, afterEach, describe, test, expect } from 'vitest'

// Mock the routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: { template: '<div>Home</div>' }
  },
  {
    path: '/about',
    name: 'about',
    component: { template: '<div>About Us</div>' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: { template: '<div>Contact</div>' }
  },
  {
    path: '/services',
    name: 'services',
    component: { template: '<div>Services</div>' }
  }
]

// Helper function to create router with specific base
function createTestRouter(base: string = '/'): Router {
  return createRouter({
    history: createMemoryHistory(base),
    routes
  })
}

// Helper function to simulate URL with redirect parameter
function simulateRedirectUrl(path: string, base: string = '/'): URL {
  const url = new URL(`http://localhost${base}index.html?redirect=${encodeURIComponent(path)}`)
  Object.defineProperty(window, 'location', {
    value: url,
    writable: true
  })
  return url
}

describe('Router Functionality', () => {
  let router: Router

  beforeEach(() => {
    // Reset router for each test
    router = createTestRouter()

    // Mock window.location
    delete (window as any).location
    window.location = new URL('http://localhost/') as any

    // Mock window.history
    window.history.replaceState = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Direct Route Access (SPA Fallback)', () => {
    test('should handle redirect parameter and navigate to correct route', async () => {
      // Simulate coming from 404.html with redirect parameter
      simulateRedirectUrl('/about')

      // Mock router.push
      const pushSpy = vi.spyOn(router, 'push')

      // Call the redirect handler
      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith('/about')
      expect(window.history.replaceState).toHaveBeenCalled()
    })

    test('should clean up URL after redirect', async () => {
      simulateRedirectUrl('/contact')

      handleRedirect(router)

      // Verify URL was cleaned up (redirect parameter removed)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/index.html'
      )
    })

    test('should handle routes with query parameters', async () => {
      simulateRedirectUrl('/about?tab=info')

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith('/about?tab=info')
    })

    test('should handle routes with hash fragments', async () => {
      simulateRedirectUrl('/contact#form')

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith('/contact#form')
    })

    test('should handle special characters in URLs', async () => {
      simulateRedirectUrl('/about?name=John%20Doe&email=john@example.com')

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith('/about?name=John%20Doe&email=john@example.com')
    })
  })

  describe('Environment-Specific Behavior', () => {
    test('should handle staging environment base path', async () => {
      const stagingRouter = createTestRouter('/staging/')
      simulateRedirectUrl('/about', '/staging/')

      const pushSpy = vi.spyOn(stagingRouter, 'push')

      handleRedirect(stagingRouter)

      expect(pushSpy).toHaveBeenCalledWith('/about')
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/staging/index.html'
      )
    })

    test('should handle production environment base path', async () => {
      const prodRouter = createTestRouter('/')
      simulateRedirectUrl('/services', '/')

      const pushSpy = vi.spyOn(prodRouter, 'push')

      handleRedirect(prodRouter)

      expect(pushSpy).toHaveBeenCalledWith('/services')
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost/index.html'
      )
    })
  })

  describe('Router Navigation', () => {
    test('should navigate between routes programmatically', async () => {
      await router.push('/')
      expect(router.currentRoute.value.path).toBe('/')

      await router.push('/about')
      expect(router.currentRoute.value.path).toBe('/about')

      await router.push('/contact')
      expect(router.currentRoute.value.path).toBe('/contact')
    })

    test('should load correct components for each route', async () => {
      // Create a test component that uses router-view
      const TestApp = {
        template: '<div><router-view /></div>'
      }

      const wrapper = mount(TestApp, {
        global: {
          plugins: [router]
        }
      })

      // Navigate to about page
      await router.push('/about')
      await nextTick()
      expect(wrapper.text()).toContain('About Us')

      // Navigate to contact page
      await router.push('/contact')
      await nextTick()
      expect(wrapper.text()).toContain('Contact')
    })
  })

  describe('Edge Cases', () => {
    test('should handle missing redirect parameter gracefully', async () => {
      // No redirect parameter in URL
      window.location = new URL('http://localhost/index.html') as any

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).not.toHaveBeenCalled()
    })

    test('should handle invalid redirect parameter gracefully', async () => {
      // Invalid redirect parameter
      window.location = new URL('http://localhost/index.html?redirect=invalid%20url') as any

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith('invalid url')
    })

    test('should handle empty redirect parameter gracefully', async () => {
      // Empty redirect parameter
      window.location = new URL('http://localhost/index.html?redirect=') as any

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).not.toHaveBeenCalled()
    })

    test('should handle non-existent routes gracefully', async () => {
      simulateRedirectUrl('/non-existent-route')

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      // Should still attempt to navigate, router will handle 404
      expect(pushSpy).toHaveBeenCalledWith('/non-existent-route')
    })
  })

  describe('Integration Tests', () => {
    test('should handle complex URL with multiple parameters', async () => {
      const complexUrl = '/services?category=web&sort=price&filter=active#top'
      simulateRedirectUrl(complexUrl)

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith(complexUrl)
    })

    test('should handle URL with special characters and encoding', async () => {
      const specialUrl = '/contact?name=José&message=Hello%20World!&email=test@example.com'
      simulateRedirectUrl(specialUrl)

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith(specialUrl)
    })

    test('should handle deep nested routes', async () => {
      const deepUrl = '/services/web-development/frameworks/vue'
      simulateRedirectUrl(deepUrl)

      const pushSpy = vi.spyOn(router, 'push')

      handleRedirect(router)

      expect(pushSpy).toHaveBeenCalledWith(deepUrl)
    })
  })
})