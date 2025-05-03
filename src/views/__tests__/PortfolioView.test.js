import { mount } from '@vue/test-utils'
import PortfolioView from '../PortfolioView.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// Mock vue3-carousel components
jest.mock('vue3-carousel', () => ({
  Carousel: {
    name: 'Carousel',
    template: '<div><slot /><slot name="addons" /></div>'
  },
  Slide: {
    name: 'Slide',
    template: '<div><slot /></div>'
  },
  Pagination: {
    name: 'Pagination',
    template: '<div />'
  },
  Navigation: {
    name: 'Navigation',
    template: '<div />'
  }
}))

describe('PortfolioView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PortfolioView, {
      global: {
        components: {
          Carousel,
          Slide,
          Pagination,
          Navigation
        }
      }
    })
  })

  it('renders the portfolio title', () => {
    expect(wrapper.find('h1').text()).toBe('Our Portfolio')
  })

  it('renders all portfolio items', () => {
    const items = wrapper.findAll('.bg-light-gray')
    expect(items).toHaveLength(6)
  })

  it('opens modal when clicking a portfolio item', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')
    expect(wrapper.vm.selectedItem).toBeTruthy()
    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('closes modal when clicking close button', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')
    expect(wrapper.vm.selectedItem).toBeTruthy()

    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')
    expect(wrapper.vm.selectedItem).toBe(null)
  })

  it('displays correct portfolio item details in modal', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const modalTitle = wrapper.find('.text-3xl')
    expect(modalTitle.text()).toBe('E-commerce Platform')

    const modalDetails = wrapper.findAll('.text-dark-gray')
    expect(modalDetails[1].text()).toContain('e-commerce platform')
  })

  it('displays correct portfolio item titles', () => {
    const titles = wrapper.findAll('h3')
    expect(titles[0].text()).toBe('E-commerce Platform')
    expect(titles[1].text()).toBe('Travel Management System')
    expect(titles[2].text()).toBe('Software Licensing System')
  })

  it('closes modal when clicking outside', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const modalOverlay = wrapper.find('.fixed')
    await modalOverlay.trigger('click')

    expect(wrapper.vm.selectedItem).toBeNull()
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  // Carousel specific tests
  it('renders carousel component in modal', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    expect(wrapper.findComponent(Carousel).exists()).toBe(true)
    expect(wrapper.findComponent(Slide).exists()).toBe(true)
    expect(wrapper.findComponent(Pagination).exists()).toBe(true)
    expect(wrapper.findComponent(Navigation).exists()).toBe(true)
  })

  it('displays correct number of slides for each portfolio item', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const slides = wrapper.findAllComponents(Slide)
    expect(slides.length).toBe(3) // Each item has 3 images
  })

  it('renders navigation controls in carousel', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const navigation = wrapper.find('.carousel__prev')
    expect(navigation.exists()).toBe(true)
  })

  it('renders pagination dots in carousel', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const pagination = wrapper.find('.carousel__pagination')
    expect(pagination.exists()).toBe(true)
  })

  it('displays correct images in carousel', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const images = wrapper.findAll('img')
    expect(images[1].attributes('src')).toBe('../assets/portfolio/ecommerce-1.jpg')
    expect(images[2].attributes('src')).toBe('../assets/portfolio/ecommerce-2.jpg')
    expect(images[3].attributes('src')).toBe('../assets/portfolio/ecommerce-3.jpg')
  })

  it('applies correct styling to carousel elements', async () => {
    const firstItem = wrapper.findAll('.bg-light-gray')[0]
    await firstItem.trigger('click')

    const carouselItem = wrapper.find('.carousel__item')
    expect(carouselItem.classes()).toContain('carousel__item')
    expect(carouselItem.attributes('style')).toContain('min-height: 200px')
  })
})