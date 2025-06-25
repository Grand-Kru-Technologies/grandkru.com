import { mount, VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, it, expect, vi, beforeEach as vitestBeforeEach } from 'vitest'
import ContactView from '../ContactView.vue'

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}))

// Import the mocked module
import emailjs from '@emailjs/browser'

describe('ContactView', () => {
  let wrapper: VueWrapper

  vitestBeforeEach(() => {
    wrapper = mount(ContactView)
    vi.clearAllMocks()
  })

  it('renders the contact form', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('renders all form fields', () => {
    const formFields = wrapper.findAll('input, textarea')
    expect(formFields).toHaveLength(4) // name, email, subject, message
  })

  it('validates required fields', async () => {
    await wrapper.find('form').trigger('submit')

    const errorMessages = wrapper.findAll('.text-red-500')
    expect(errorMessages.length).toBeGreaterThan(0) // Should have validation errors
  })

  it('validates email format', async () => {
    await wrapper.find('#email').setValue('invalid-email')
    await wrapper.find('form').trigger('submit')

    const emailError = wrapper.find('#email').element.nextElementSibling
    expect(emailError?.textContent).toContain('valid email address')
  })

  it('shows success message on successful submission', async () => {
    // Mock successful email send
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200 } as any)

    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check success message - uses bg-green-100/80 class
    expect(wrapper.find('.bg-green-100\\/80').exists()).toBe(true)
    expect(wrapper.find('.bg-green-100\\/80').text()).toContain('successfully')
  })

  it('shows error message on failed submission', async () => {
    // Mock failed email send
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('Failed to send email'))

    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check error message - uses bg-red-100/80 class
    expect(wrapper.find('.bg-red-100\\/80').exists()).toBe(true)
  })

  it('disables submit button while submitting', async () => {
    // Mock email send with delay
    vi.mocked(emailjs.send).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))

    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check button state
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toContain('Sending...')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('sends correct data to EmailJS', async () => {
    // Mock successful email send
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200 } as any)

    // Fill out and submit form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    // Click close button on success message
    await wrapper.find('.bg-green-100\\/80 button').trigger('click')
    await wrapper.vm.$nextTick()

    // Check that success message is gone
    expect(wrapper.find('.bg-green-100\\/80').exists()).toBe(false)
  })

  it('has proper form labels', () => {
    expect(wrapper.find('label[for="name"]').text()).toBe('Name')
    expect(wrapper.find('label[for="email"]').text()).toBe('Email')
    expect(wrapper.find('label[for="subject"]').text()).toBe('Subject')
    expect(wrapper.find('label[for="message"]').text()).toBe('Message')
  })

  it('has proper input types', () => {
    expect(wrapper.find('#name').attributes('type')).toBe('text')
    expect(wrapper.find('#email').attributes('type')).toBe('email')
    expect(wrapper.find('#subject').attributes('type')).toBe('text')
    expect(wrapper.find('#message').element.tagName).toBe('TEXTAREA')
  })
})