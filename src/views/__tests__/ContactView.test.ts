import { mount, VueWrapper } from '@vue/test-utils'
import ContactView from '../ContactView.vue'
import emailjs from '@emailjs/browser'

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  send: jest.fn()
}))

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

describe('ContactView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ContactView)
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  it('renders the contact form', () => {
    expect(wrapper.find('h1').text()).toBe('Contact Us')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input')).toHaveLength(3)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('validates required fields', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(wrapper.vm.errors.name).toBe('Name is required')
    expect(wrapper.vm.errors.email).toBe('Email is required')
    expect(wrapper.vm.errors.subject).toBe('Subject is required')
    expect(wrapper.vm.errors.message).toBe('Message is required')
  })

  it('validates email format', async () => {
    const form = wrapper.find('form')
    const emailInput = wrapper.find('input[type="email"]')

    await emailInput.setValue('invalid-email')
    await form.trigger('submit')

    expect(wrapper.vm.errors.email).toBe('Please enter a valid email address')
  })

  it('shows success message on successful submission', async () => {
    // Mock successful email send
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })

    // Fill out the form
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[id="subject"]').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for the submission to complete
    await wrapper.vm.$nextTick()

    // Check that success message is shown
    expect(wrapper.vm.showSuccess).toBe(true)
    expect(wrapper.find('.bg-green-100').exists()).toBe(true)
  })

  it('shows error message on failed submission', async () => {
    // Mock failed email send
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error('Failed to send email'))

    // Fill out the form
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[id="subject"]').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for the submission to complete
    await wrapper.vm.$nextTick()

    // Check that error message is shown
    expect(wrapper.vm.showError).toBe(true)
    expect(wrapper.find('.bg-red-100').exists()).toBe(true)
  })

  it('resets form after successful submission', async () => {
    // Mock successful email send
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })

    // Fill out the form
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[id="subject"]').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for the submission to complete
    await wrapper.vm.$nextTick()

    // Check that form is reset
    const form = wrapper.vm.form as FormData
    expect(form.name).toBe('')
    expect(form.email).toBe('')
    expect(form.subject).toBe('')
    expect(form.message).toBe('')
  })

  it('disables submit button while submitting', async () => {
    // Mock email send with delay
    (emailjs.send as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))

    // Fill out the form
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[id="subject"]').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check that button is disabled
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').text()).toBe('Sending...')

    // Wait for submission to complete
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    // Check that button is enabled again
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('button').text()).toBe('Send Message')
  })

  it('sends correct data to EmailJS', async () => {
    // Mock successful email send
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })

    // Fill out the form
    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('input[id="subject"]').setValue('Test Subject')
    await wrapper.find('textarea').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check that EmailJS was called with correct data
    expect(emailjs.send).toHaveBeenCalledWith(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: 'John Doe',
        from_email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      },
      'YOUR_PUBLIC_KEY'
    )
  })
})