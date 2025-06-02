import { mount } from '@vue/test-utils'
import AboutView from '../AboutView.vue'

describe('AboutView.vue', () => {
  const wrapper = mount(AboutView)

  it('renders the about view component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the hero image', () => {
    const heroImage = wrapper.find('img')
    expect(heroImage.exists()).toBe(true)
    expect(heroImage.attributes('alt')).toBe('Technology Hero Image')
    expect(heroImage.attributes('src')).toContain('geometric-1732847.jpg')
  })

  it('displays the main heading', () => {
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('Our Story')
  })

  it('displays the company description paragraphs', () => {
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs).toHaveLength(2)

    expect(paragraphs[0].text()).toContain('Grand Kru Technologies bridges traditional business with digital innovation')
    expect(paragraphs[1].text()).toContain('We build lasting partnerships by working closely with clients')
  })

  it('has the correct layout structure', () => {
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.max-w-7xl').exists()).toBe(true)
  })
})