import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactView from '../ContactView.vue'

describe('ContactView', () => {
  it('renders the contact title', () => {
    const wrapper = mount(ContactView)
    expect(wrapper.find('h1').text()).toBe('Contact Us')
  })

  it('renders all form fields', () => {
    const wrapper = mount(ContactView)
    const inputs = wrapper.findAll('input')
    const textarea = wrapper.find('textarea')

    expect(inputs).toHaveLength(3)
    expect(textarea.exists()).toBe(true)
  })

  it('validates required fields', async () => {
    const wrapper = mount(ContactView)
    const form = wrapper.find('form')

    await form.trigger('submit')

    const errorMessages = wrapper.findAll('.text-red-500')
    expect(errorMessages).toHaveLength(4)
    expect(errorMessages[0].text()).toBe('Name is required')
    expect(errorMessages[1].text()).toBe('Email is required')
    expect(errorMessages[2].text()).toBe('Subject is required')
    expect(errorMessages[3].text()).toBe('Message is required')
  })

  it('validates email format', async () => {
    const wrapper = mount(ContactView)
    const emailInput = wrapper.find('input[type="email"]')

    await emailInput.setValue('invalid-email')
    await wrapper.find('form').trigger('submit')

    const errorMessage = wrapper.find('.text-red-500')
    expect(errorMessage.text()).toBe('Please enter a valid email address')
  })

  it('handles form submission', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('input#name').setValue('John Doe')
    await wrapper.find('input#email').setValue('john@example.com')
    await wrapper.find('input#subject').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    await wrapper.find('form').trigger('submit')

    // Check if form is reset after submission
    expect(wrapper.find('input#name').element.value).toBe('')
    expect(wrapper.find('input#email').element.value).toBe('')
    expect(wrapper.find('input#subject').element.value).toBe('')
    expect(wrapper.find('textarea').element.value).toBe('')
  })
})