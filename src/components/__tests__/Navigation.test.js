import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Navigation from '../Navigation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/services', name: 'services' },
    { path: '/portfolio', name: 'portfolio' },
    { path: '/contact', name: 'contact' }
  ]
})

describe('Navigation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Navigation, {
      global: {
        plugins: [router]
      }
    })
  })

  it('renders the logo', () => {
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('alt')).toBe('Grandkru Technologies Logo')
  })

  it('renders all navigation items', () => {
    const navItems = wrapper.findAll('.router-link')
    expect(navItems).toHaveLength(5)
    expect(navItems[0].text()).toBe('Home')
    expect(navItems[1].text()).toBe('About')
    expect(navItems[2].text()).toBe('Services')
    expect(navItems[3].text()).toBe('Portfolio')
    expect(navItems[4].text()).toBe('Contact')
  })

  it('toggles mobile menu when button is clicked', async () => {
    const button = wrapper.find('button')
    expect(wrapper.find('.md\\:hidden').exists()).toBe(false)

    await button.trigger('click')
    expect(wrapper.find('.md\\:hidden').exists()).toBe(true)

    await button.trigger('click')
    expect(wrapper.find('.md\\:hidden').exists()).toBe(false)
  })

  it('closes mobile menu when a link is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    const mobileLinks = wrapper.findAll('.md\\:hidden .router-link')
    await mobileLinks[0].trigger('click')

    expect(wrapper.find('.md\\:hidden').exists()).toBe(false)
  })
})