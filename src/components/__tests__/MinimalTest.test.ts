import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MinimalTest from '../MinimalTest.vue'

describe('MinimalTest.vue', () => {
  it('renders', () => {
    const wrapper = mount(MinimalTest)
    expect(wrapper.text()).toContain('Minimal Component')
  })
})