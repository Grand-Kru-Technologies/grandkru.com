import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PortfolioView from '../PortfolioView.vue'

describe('PortfolioView', () => {
  it('renders the portfolio title', () => {
    const wrapper = mount(PortfolioView)
    expect(wrapper.find('h1').text()).toBe('Our Portfolio')
  })

  it('renders portfolio items', () => {
    const wrapper = mount(PortfolioView)
    const portfolioItems = wrapper.findAll('.bg-light-gray')
    expect(portfolioItems).toHaveLength(3)
  })

  it('opens modal when portfolio item is clicked', async () => {
    const wrapper = mount(PortfolioView)
    const portfolioItem = wrapper.find('.bg-light-gray')

    await portfolioItem.trigger('click')
    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('closes modal when close button is clicked', async () => {
    const wrapper = mount(PortfolioView)
    const portfolioItem = wrapper.find('.bg-light-gray')

    await portfolioItem.trigger('click')
    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('displays correct portfolio item data in modal', async () => {
    const wrapper = mount(PortfolioView)
    const portfolioItem = wrapper.find('.bg-light-gray')

    await portfolioItem.trigger('click')
    const modalTitle = wrapper.find('.text-3xl')
    expect(modalTitle.text()).toBe('E-commerce Platform')
  })

  it('renders technology tags', async () => {
    const wrapper = mount(PortfolioView)
    const portfolioItem = wrapper.find('.bg-light-gray')

    await portfolioItem.trigger('click')
    const techTags = wrapper.findAll('.rounded-full')
    expect(techTags).toHaveLength(4)
    expect(techTags[0].text()).toBe('WordPress')
  })
})