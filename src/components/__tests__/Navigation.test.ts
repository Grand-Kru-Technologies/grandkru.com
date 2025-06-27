import { mount, VueWrapper } from '@vue/test-utils'
import Navigation from '../Navigation.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, beforeEach, it, expect } from 'vitest'

// Mock router-link component
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to']
}

describe('Navigation', () => {
  let wrapper: VueWrapper
  let router: ReturnType<typeof createRouter>

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
        { path: '/services', component: { template: '<div>Services</div>' } },
        { path: '/contact', component: { template: '<div>Contact</div>' } }
      ]
    })

    // Initialize router
    await router.push('/')

    wrapper = mount(Navigation, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  })

  it('renders the navigation component', () => {
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('renders all navigation links', () => {
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links).toHaveLength(5) // 4 nav links + 1 logo link
    expect(links[1].text()).toBe('Home')
    expect(links[2].text()).toBe('About')
    expect(links[3].text()).toBe('Services')
    expect(links[4].text()).toBe('Contact')
  })

  it('toggles mobile menu when clicking the menu button', async () => {
    const menuButton = wrapper.find('button')

    // Initially mobile menu should be hidden
    expect(wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4').exists()).toBe(false)

    await menuButton.trigger('click')
    // Mobile menu should be visible
    expect(wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4').exists()).toBe(true)

    await menuButton.trigger('click')
    // Mobile menu should be hidden again
    expect(wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4').exists()).toBe(false)
  })

  it('closes mobile menu when clicking a link', async () => {
    const menuButton = wrapper.find('button')
    await menuButton.trigger('click')
    expect(wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4').exists()).toBe(true)

    // Find mobile menu links (they have @click="isMenuOpen = false")
    const mobileMenu = wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4')
    const mobileLinks = mobileMenu.findAllComponents(RouterLinkStub)

    // Click the first mobile menu link
    await mobileLinks[0].trigger('click')
    expect(wrapper.find('.md\\:hidden.glass.rounded-lg.mt-2.p-4').exists()).toBe(false)
  })
})