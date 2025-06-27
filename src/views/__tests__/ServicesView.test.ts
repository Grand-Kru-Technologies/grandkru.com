import { mount, VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, it, expect } from 'vitest'
import ServicesView from '../ServicesView.vue'

describe('ServicesView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ServicesView)
  })

  it('renders the services title', () => {
    expect(wrapper.find('h1').text()).toBe('Our Services')
  })

  it('renders the correct number of service cards', () => {
    const serviceCards = wrapper.findAll('.rounded-xl.shadow-lg')
    expect(serviceCards).toHaveLength(5)
  })

  it('renders the correct service titles', () => {
    const serviceTitles = wrapper.findAll('h3')
    expect(serviceTitles).toHaveLength(5)
    expect(serviceTitles[0].text()).toBe('Web Development')
    expect(serviceTitles[1].text()).toBe('AI Automation')
    expect(serviceTitles[2].text()).toBe('Financial Quality Assurance')
    expect(serviceTitles[3].text()).toBe('E-Commerce')
    expect(serviceTitles[4].text()).toBe('Business Process Automation')
  })

  it('renders service summaries', () => {
    const summaries = wrapper.findAll('p')
    expect(summaries[0].text()).toContain('Custom web applications')
    expect(summaries[1].text()).toContain('Intelligent automation solutions')
    expect(summaries[2].text()).toContain('AI-powered financial oversight')
  })

  it('renders "Learn more" text on each card', () => {
    const learnMoreTexts = wrapper.findAll('span')
    const learnMoreElements = learnMoreTexts.filter(el => el.text() === 'Learn more')
    expect(learnMoreElements).toHaveLength(5)
  })

  it('has clickable service cards', () => {
    const serviceCards = wrapper.findAll('.cursor-pointer')
    expect(serviceCards).toHaveLength(5)
  })

  it('has gradient overlays on service cards', () => {
    const gradientOverlays = wrapper.findAll('.opacity-80')
    expect(gradientOverlays.length).toBeGreaterThan(0)
  })

  it('has background images on service cards', () => {
    // Look for the div elements that have background images applied
    const backgroundDivs = wrapper.findAll('.absolute.inset-0.bg-cover.bg-center')
    expect(backgroundDivs.length).toBeGreaterThan(0)

    // Alternative: check if any elements have style attributes
    const elementsWithStyle = wrapper.findAll('[style]')
    expect(elementsWithStyle.length).toBeGreaterThan(0)
  })

  describe('Modal Functionality', () => {
    it('opens modal when clicking a service card', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      // Modal should be visible
      expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
      expect(wrapper.find('.bg-black.bg-opacity-50').exists()).toBe(true)
    })

    it('displays correct service title in modal', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      const modalTitle = wrapper.find('h2')
      expect(modalTitle.text()).toBe('Web Development')
    })

    it('closes modal when clicking close button', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      // Modal should be open
      expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

      // Click close button
      const closeButton = wrapper.find('button')
      await closeButton.trigger('click')

      // Modal should be closed
      expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
    })

    it('closes modal when clicking outside modal', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      // Modal should be open
      expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)

      // Click outside modal
      const modalOverlay = wrapper.find('.fixed.inset-0')
      await modalOverlay.trigger('click')

      // Modal should be closed
      expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
    })

    it('displays service details in modal', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      // Check for modal content sections
      const modalContent = wrapper.find('.p-6.space-y-6')
      expect(modalContent.exists()).toBe(true)

      // Check for specific sections by looking for h3 elements
      const sectionHeaders = wrapper.findAll('h3')
      const headerTexts = sectionHeaders.map(h => h.text())
      expect(headerTexts).toContain('Service Overview')
      expect(headerTexts).toContain('Detailed Description')
      expect(headerTexts).toContain('Key Features')
      expect(headerTexts).toContain('Technologies Used')
    })

    it('displays technology tags in modal', async () => {
      const firstServiceCard = wrapper.findAll('.cursor-pointer')[0]
      await firstServiceCard.trigger('click')

      const techTags = wrapper.findAll('.bg-primary.bg-opacity-10')
      expect(techTags.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('has responsive grid layout', () => {
      const gridContainer = wrapper.find('.grid')
      expect(gridContainer.classes()).toContain('grid-cols-1')
      expect(gridContainer.classes()).toContain('md:grid-cols-2')
      expect(gridContainer.classes()).toContain('lg:grid-cols-3')
    })

    it('has responsive container', () => {
      const container = wrapper.find('.container')
      expect(container.classes()).toContain('mx-auto')
      expect(container.classes()).toContain('px-4')
    })
  })
})
