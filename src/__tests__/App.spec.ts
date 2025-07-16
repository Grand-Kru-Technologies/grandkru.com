import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App.vue'

// Mock components
const HomeView = { template: '<div>Home</div>' }
const AboutView = { template: '<div>About</div>' }
const ContactView = { template: '<div>Contact</div>' }
const ServicesView = { template: '<div>Services</div>' }
const PortfolioView = { template: '<div>Portfolio</div>' }

describe('App', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: HomeView },
        { path: '/about', component: AboutView },
        { path: '/contact', component: ContactView },
        { path: '/services', component: ServicesView },
        { path: '/portfolio', component: PortfolioView }
      ]
    })

    await router.push('/')
  })

  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})