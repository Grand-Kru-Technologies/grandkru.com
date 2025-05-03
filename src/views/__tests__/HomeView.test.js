import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders the welcome message', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('h1').text()).toContain('Welcome to Grand Kru Technologies')
  })

  it('renders the company description', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('p').text()).toContain('innovative technology solutions')
  })

  it('renders the call-to-action buttons', () => {
    const wrapper = mount(HomeView)
    const buttons = wrapper.findAll('.router-link')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('Get in Touch')
  })

  it('renders the company logo', () => {
    const wrapper = mount(HomeView)
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Grand Kru Technologies Logo')
  })
})