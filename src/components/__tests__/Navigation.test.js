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

  it('renders all navigation links', () => {
    const links = wrapper.findAll('.router-link')
    expect(links).toHaveLength(3)
    expect(links[0].text()).toBe('Home')
    expect(links[1].text()).toBe('About')
    expect(links[2].text()).toBe('Contact')
  })

  it('toggles mobile menu', async () => {
    const menuButton = wrapper.find('button')
    expect(wrapper.vm.isMenuOpen).toBe(false)

    await menuButton.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)

    await menuButton.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })

  it('closes mobile menu when clicking a link', async () => {
    const menuButton = wrapper.find('button')
    await menuButton.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)

    const link = wrapper.find('.router-link')
    await link.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })
})