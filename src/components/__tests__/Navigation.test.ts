import { mount, VueWrapper } from '@vue/test-utils'
import Navigation from '../Navigation.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Mock router-link component
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to']
}

describe('Navigation', () => {
  let wrapper: VueWrapper
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
        { path: '/contact', component: { template: '<div>Contact</div>' } }
      ]
    })

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
    expect(links).toHaveLength(4) // 3 nav links + 1 logo link
    expect(links[1].text()).toBe('Home')
    expect(links[2].text()).toBe('About')
    expect(links[3].text()).toBe('Contact')
  })

  it('toggles mobile menu when clicking the menu button', async () => {
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

    const links = wrapper.findAllComponents(RouterLinkStub)
    await links[1].trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })
})