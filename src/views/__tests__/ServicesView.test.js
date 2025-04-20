import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServicesView from '../ServicesView.vue'

describe('ServicesView', () => {
  it('renders the services title', () => {
    const wrapper = mount(ServicesView)
    expect(wrapper.find('h1').text()).toBe('Our Services')
  })

  it('renders all service cards', () => {
    const wrapper = mount(ServicesView)
    const serviceCards = wrapper.findAll('.bg-light-gray')
    expect(serviceCards).toHaveLength(6)
  })

  it('renders service titles correctly', () => {
    const wrapper = mount(ServicesView)
    const serviceTitles = wrapper.findAll('h3')
    expect(serviceTitles[0].text()).toBe('E-commerce Implementation')
    expect(serviceTitles[1].text()).toBe('Unified Travel Platform')
    expect(serviceTitles[2].text()).toBe('Licensing Model Development')
    expect(serviceTitles[3].text()).toBe('Database Optimization')
    expect(serviceTitles[4].text()).toBe('Technical Training')
    expect(serviceTitles[5].text()).toBe('Curriculum Development')
  })

  it('renders service descriptions', () => {
    const wrapper = mount(ServicesView)
    const descriptions = wrapper.findAll('p')
    expect(descriptions[0].text()).toContain('WordPress')
    expect(descriptions[1].text()).toContain('travel platform')
    expect(descriptions[2].text()).toContain('Rails API')
  })
})