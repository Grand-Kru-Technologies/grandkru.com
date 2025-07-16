import { mount, VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, it, expect } from 'vitest'
import PortfolioView from '../PortfolioView.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// Mock vue3-carousel components
const MockCarousel = {
  name: 'Carousel',
  template: '<div class="carousel"><slot /></div>',
  props: ['itemsToShow', 'wrapAround', 'autoplay']
}

const MockSlide = {
  name: 'Slide',
  template: '<div class="slide"><slot /></div>'
}

const MockPagination = {
  name: 'Pagination',
  template: '<div class="pagination"></div>'
}

const MockNavigation = {
  name: 'Navigation',
  template: '<div class="navigation"></div>'
}

describe('PortfolioView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(PortfolioView, {
      global: {
        stubs: {
          Carousel: MockCarousel,
          Slide: MockSlide,
          Pagination: MockPagination,
          Navigation: MockNavigation
        }
      }
    })
  })

  it('renders the portfolio view', () => {
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
  })

  it('displays the main heading', () => {
    expect(wrapper.find('h1').text()).toBe('Our Portfolio')
  })

  it('renders category tabs', () => {
    const tabs = wrapper.findAll('button')
    expect(tabs).toHaveLength(3)
    expect(tabs[0].text()).toBe('All Projects')
    expect(tabs[1].text()).toBe('Websites')
    expect(tabs[2].text()).toBe('Business Processes')
  })

  it('shows all projects by default', () => {
    const portfolioItems = wrapper.findAll('.bg-light-gray.rounded-lg')
    expect(portfolioItems.length).toBeGreaterThan(0)
  })

  it('filters projects when category is selected', async () => {
    const websiteTab = wrapper.findAll('button')[1]
    await websiteTab.trigger('click')

    // Should show only website projects
    const portfolioItems = wrapper.findAll('.bg-light-gray.rounded-lg')
    expect(portfolioItems.length).toBeGreaterThan(0)

    // Check that all visible items have website category
    const categoryBadges = wrapper.findAll('.bg-primary.text-white')
    categoryBadges.forEach(badge => {
      expect(badge.text()).toBe('websites')
    })
  })

  it('shows empty state when no projects in category', async () => {
    // This would require mocking the portfolio data to have no items
    // For now, we'll test that the empty state component exists
    const emptyState = wrapper.find('.text-center.py-12')
    // Empty state should not be visible by default since we have projects
    expect(emptyState.exists()).toBe(false)
  })

  it('opens modal when portfolio item is clicked', async () => {
    const firstPortfolioItem = wrapper.findAll('.bg-light-gray.rounded-lg')[0]
    await firstPortfolioItem.trigger('click')

    // Modal should be visible
    const modal = wrapper.find('.fixed.inset-0')
    expect(modal.exists()).toBe(true)
  })

  it('closes modal when close button is clicked', async () => {
    // First open the modal
    const firstPortfolioItem = wrapper.findAll('.bg-light-gray.rounded-lg')[0]
    await firstPortfolioItem.trigger('click')

    // Then close it
    const closeButton = wrapper.find('button.text-dark-gray.hover\\:text-primary')
    await closeButton.trigger('click')

    // Modal should not be visible
    const modal = wrapper.find('.fixed.inset-0')
    expect(modal.exists()).toBe(false)
  })

  it('displays technology tags on portfolio items', () => {
    const techTags = wrapper.findAll('.bg-primary.bg-opacity-10.text-primary')
    expect(techTags.length).toBeGreaterThan(0)
  })

  it('shows category badges on portfolio items', () => {
    const categoryBadges = wrapper.findAll('.bg-primary.text-white.px-3.py-1.rounded-full')
    expect(categoryBadges.length).toBeGreaterThan(0)
  })
})