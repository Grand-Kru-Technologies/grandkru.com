import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import PasswordProtection from '../PasswordProtection.vue'
import CryptoJS from 'crypto-js'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<div>Home</div>' }
    }
  ]
})

describe('PasswordProtection.vue', () => {
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    wrapper = mount(PasswordProtection, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true
        }
      },
      slots: {
        default: '<div class="protected-content">Protected Content</div>'
      }
    })
  })

  it('renders the password protection component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('shows password form when not authenticated', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows protected content when authenticated', async () => {
    // Mock successful authentication
    const authToken = CryptoJS.AES.encrypt('authenticated', '267c90b198ff3b526a9cf32f31493b18de232ee46dcdde5b3088856ee6836792').toString()
    localStorageMock.getItem.mockReturnValue(authToken)

    // Re-mount component to trigger onMounted
    wrapper = mount(PasswordProtection, {
      global: {
        plugins: [router]
      },
      slots: {
        default: '<div class="protected-content">Protected Content</div>'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.protected-content').exists()).toBe(true)
  })

  it('shows error message for incorrect password', async () => {
    await wrapper.find('input[type="password"]').setValue('wrong-password')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('.text-red-500').exists()).toBe(true)
    expect(wrapper.find('.text-red-500').text()).toContain('Incorrect password')
  })

  it('increments attempts counter on failed attempts', async () => {
    await wrapper.find('input[type="password"]').setValue('wrong-password')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('.text-gray-500').text()).toContain('Attempts remaining: 4')
  })

  it('locks out after maximum attempts', async () => {
    // Try 5 times with wrong password
    for (let i = 0; i < 5; i++) {
      await wrapper.find('input[type="password"]').setValue('wrong-password')
      await wrapper.find('form').trigger('submit')
    }

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').text()).toContain('Try again in')
  })

  it('enables form after lockout period', async () => {
    // Trigger lockout
    for (let i = 0; i < 5; i++) {
      await wrapper.find('input[type="password"]').setValue('wrong-password')
      await wrapper.find('form').trigger('submit')
    }

    // Fast-forward time
    jest.advanceTimersByTime(300000) // 5 minutes
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('button').text()).toBe('Submit')
  })

  it('prevents rapid submission attempts', async () => {
    await wrapper.find('input[type="password"]').setValue('wrong-password')
    await wrapper.find('form').trigger('submit')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('.text-red-500').text()).toContain('Please wait before trying again')
  })

  it('stores authentication token on successful login', async () => {
    // Mock successful password decryption
    const decryptedPassword = 'correct-password'
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValue({
      toString: () => decryptedPassword
    })

    await wrapper.find('input[type="password"]').setValue(decryptedPassword)
    await wrapper.find('form').trigger('submit')

    expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', expect.any(String))
  })

  it('clears error message on successful login', async () => {
    // Mock successful password decryption
    const decryptedPassword = 'correct-password'
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValue({
      toString: () => decryptedPassword
    })

    // First try with wrong password
    await wrapper.find('input[type="password"]').setValue('wrong-password')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.text-red-500').exists()).toBe(true)

    // Then try with correct password
    await wrapper.find('input[type="password"]').setValue(decryptedPassword)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
  })
})