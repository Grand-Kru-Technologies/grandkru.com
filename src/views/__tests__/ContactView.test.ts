import { mount, VueWrapper } from '@vue/test-utils'
import ContactView from '../ContactView.vue'
import emailjs from '@emailjs/browser'

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  default: {
    send: jest.fn()
  }
}))

<<<<<<< Updated upstream:src/views/__tests__/ContactView.test.ts
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

describe('ContactView', () => {
  let wrapper: VueWrapper
=======
// Mock environment variables
jest.mock('import.meta.env', () => ({
  VITE_EMAILJS_SERVICE_ID: 'test-service-id',
  VITE_EMAILJS_TEMPLATE_ID: 'test-template-id',
  VITE_EMAILJS_PUBLIC_KEY: 'test-public-key'
}))

describe('ContactView.vue', () => {
  let wrapper
>>>>>>> Stashed changes:src/views/__tests__/ContactView.test.js

  beforeEach(() => {
    wrapper = mount(ContactView)
    jest.clearAllMocks()
  })

  it('renders the contact form', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Contact Us')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('renders all form fields', () => {
    const formFields = wrapper.findAll('input, textarea')
    expect(formFields).toHaveLength(4) // name, email, subject, message
  })

  it('validates required fields', async () => {
    await wrapper.find('form').trigger('submit')

    const errorMessages = wrapper.findAll('.text-red-500')
    expect(errorMessages).toHaveLength(4) // All fields are required
  })

  it('validates email format', async () => {
    await wrapper.find('#email').setValue('invalid-email')
    await wrapper.find('form').trigger('submit')

    const emailError = wrapper.find('#email').element.nextElementSibling
    expect(emailError.textContent).toContain('valid email address')
  })

  it('shows success message on successful submission', async () => {
<<<<<<< Updated upstream:src/views/__tests__/ContactView.test.ts
    // Mock successful email send
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })
=======
    // Mock successful email sending
    emailjs.send.mockResolvedValueOnce({ status: 200 })
>>>>>>> Stashed changes:src/views/__tests__/ContactView.test.js

    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check success message
    expect(wrapper.find('.bg-green-100').exists()).toBe(true)
    expect(wrapper.find('.bg-green-100').text()).toContain('Success')
  })

  it('shows error message on failed submission', async () => {
<<<<<<< Updated upstream:src/views/__tests__/ContactView.test.ts
    // Mock failed email send
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error('Failed to send email'))
=======
    // Mock failed email sending
    emailjs.send.mockRejectedValueOnce(new Error('Failed to send'))
>>>>>>> Stashed changes:src/views/__tests__/ContactView.test.js

    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Wait for async operations
    await wrapper.vm.$nextTick()

    // Check error message
    expect(wrapper.find('.bg-red-100').exists()).toBe(true)
<<<<<<< Updated upstream:src/views/__tests__/ContactView.test.ts
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

=======
    expect(wrapper.find('.bg-red-100').text()).toContain('Error')
  })

  it('disables submit button while submitting', async () => {
>>>>>>> Stashed changes:src/views/__tests__/ContactView.test.js
    // Fill out the form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check button state
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('Sending...')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

<<<<<<< Updated upstream:src/views/__tests__/ContactView.test.ts
  it('sends correct data to EmailJS', async () => {
    // Mock successful email send
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })
=======
  it('closes success message when close button is clicked', async () => {
    // Mock successful email sending
    emailjs.send.mockResolvedValueOnce({ status: 200 })
>>>>>>> Stashed changes:src/views/__tests__/ContactView.test.js

    // Fill out and submit form
    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('john@example.com')
    await wrapper.find('#subject').setValue('Test Subject')
    await wrapper.find('#message').setValue('Test Message')
    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    // Click close button
    await wrapper.find('.bg-green-100 svg').trigger('click')
    await wrapper.vm.$nextTick()

    // Check that success message is gone
    expect(wrapper.find('.bg-green-100').exists()).toBe(false)
  })
})