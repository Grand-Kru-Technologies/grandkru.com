import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Navigation from '../components/Navigation.vue'
import PasswordProtection from '../components/PasswordProtection.vue'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/about',
      name: 'About',
      component: { template: '<div>About</div>' }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: { template: '<div>Contact</div>' }
    }
  ]
})

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: true,
          RouterLink: true
        }
      }
    })
  })

  it('renders the app component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the Navigation component', () => {
    expect(wrapper.findComponent(Navigation).exists()).toBe(true)
  })

  it('renders the PasswordProtection component', () => {
    expect(wrapper.findComponent(PasswordProtection).exists()).toBe(true)
  })

  it('renders the router view', () => {
    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })

  it('applies fade transition to router view', () => {
    const routerView = wrapper.find('router-view-stub')
    expect(routerView.attributes('v-slot')).toBeDefined()
    expect(wrapper.find('.fade-enter-active').exists()).toBe(true)
    expect(wrapper.find('.fade-leave-active').exists()).toBe(true)
  })

  it('has the correct layout structure', () => {
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
  })
})