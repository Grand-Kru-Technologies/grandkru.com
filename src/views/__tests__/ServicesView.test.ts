import { mount, VueWrapper } from '@vue/test-utils'
import ServicesView from '../ServicesView.vue'

<<<<<<< Updated upstream:src/views/__tests__/ServicesView.test.ts
describe('ServicesView', () => {
  let wrapper: VueWrapper
=======
describe('ServicesView.vue', () => {
  let wrapper
>>>>>>> Stashed changes:src/views/__tests__/ServicesView.test.js

  beforeEach(() => {
    wrapper = mount(ServicesView)
  })

<<<<<<< Updated upstream:src/views/__tests__/ServicesView.test.ts
  it('renders the services title', () => {
=======
  it('renders the services view component', () => {
    expect(wrapper.exists()).toBe(true)
>>>>>>> Stashed changes:src/views/__tests__/ServicesView.test.js
    expect(wrapper.find('h1').text()).toBe('Our Services')
  })

  it('renders all service cards', () => {
    const serviceCards = wrapper.findAll('.bg-light-gray')
<<<<<<< Updated upstream:src/views/__tests__/ServicesView.test.ts
    expect(serviceCards).toHaveLength(6)
  })

  it('renders service titles correctly', () => {
    const serviceTitles = wrapper.findAll('h3')
    expect(serviceTitles[0].text()).toBe('E-commerce Implementation')
    expect(serviceTitles[1].text()).toBe('Website Development')
    expect(serviceTitles[2].text()).toBe('Financial Quality Assurance')
    expect(serviceTitles[3].text()).toBe('Software Development')
    expect(serviceTitles[4].text()).toBe('Business Process Automation')
    expect(serviceTitles[5].text()).toBe('Training')
  })

  it('renders service descriptions', () => {
    const descriptions = wrapper.findAll('p')
    expect(descriptions[0].text()).toContain('WordPress')
    expect(descriptions[1].text()).toContain('website solutions')
    expect(descriptions[2].text()).toContain('AI-powered')
=======
    expect(serviceCards).toHaveLength(6) // Total number of services
  })

  it('displays service titles and summaries', () => {
    const firstService = wrapper.find('.bg-light-gray')
    expect(firstService.find('h3').text()).toBe('E-commerce Implementation')
    expect(firstService.find('p').text()).toContain('Custom e-commerce solutions')
  })

  it('opens modal when clicking a service card', async () => {
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')

    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
    expect(wrapper.find('.text-3xl.font-bold').text()).toBe('E-commerce Implementation')
  })

  it('displays service details in modal', async () => {
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')

    const modal = wrapper.find('.bg-white.rounded-lg')
    expect(modal.find('h3').text()).toBe('Service Overview')
    expect(modal.find('p').text()).toContain('Custom e-commerce solutions using WordPress')
  })

  it('displays service features in modal', async () => {
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')

    const features = wrapper.findAll('.list-disc li')
    expect(features).toHaveLength(5) // Number of features for E-commerce Implementation
    expect(features[0].text()).toBe('Custom payment gateway integration')
  })

  it('displays technology tags in modal', async () => {
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')

    const techTags = wrapper.findAll('.bg-primary.bg-opacity-10')
    expect(techTags).toHaveLength(5) // Number of technologies for E-commerce Implementation
    expect(techTags[0].text()).toBe('WordPress')
  })

  it('closes modal when clicking close button', async () => {
    // Open modal
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

    // Close modal
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('closes modal when clicking outside', async () => {
    // Open modal
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

    // Click outside modal
    await wrapper.find('.fixed.inset-0').trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('does not close modal when clicking inside modal content', async () => {
    // Open modal
    const firstService = wrapper.find('.bg-light-gray')
    await firstService.trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

    // Click inside modal content
    await wrapper.find('.bg-white.rounded-lg').trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
>>>>>>> Stashed changes:src/views/__tests__/ServicesView.test.js
  })
})