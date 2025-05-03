import { mount, VueWrapper } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

// Mock router-link component
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to']
}

describe('HomeView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  })

  it('renders the welcome message', () => {
    expect(wrapper.find('h1').text()).toContain('Welcome to Grand Kru Technologies')
  })

  it('renders the company description', () => {
    expect(wrapper.find('p').text()).toContain('Designing Digital with Purpose')
  })

  it('renders the call-to-action buttons', () => {
    const buttons = wrapper.findAllComponents(RouterLinkStub)
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('Get in Touch')
  })

  it('renders the company logo', () => {
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Grandkru Technologies Logo')
  })
})