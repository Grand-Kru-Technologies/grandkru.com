import { mount, VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import DarkModeToggle from '../DarkModeToggle.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('DarkModeToggle', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
          contains: vi.fn()
        }
      },
      writable: true
    })

    wrapper = mount(DarkModeToggle)
  })

  it('renders the dark mode toggle button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows sun icon in light mode', () => {
    const sunIcon = wrapper.find('svg path[d*="M12 3v1m0 16v1m9-9h-1M4 12H3"]')
    expect(sunIcon.exists()).toBe(true)
  })

  it('shows moon icon in dark mode', async () => {
    // Simulate dark mode
    localStorageMock.getItem.mockReturnValue('true')
    
    // Re-mount to trigger the dark mode initialization
    wrapper = mount(DarkModeToggle)
    await wrapper.vm.$nextTick()
    
    const moonIcon = wrapper.find('svg path[d*="M20.354 15.354A9 9 0 018.646 3.646"]')
    expect(moonIcon.exists()).toBe(true)
  })

  it('toggles dark mode when clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true')
  })

  it('has correct accessibility attributes', () => {
    const button = wrapper.find('button')
    expect(button.attributes('title')).toBe('Switch to dark mode')
  })

  it('applies correct styling classes', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('relative')
    expect(button.classes()).toContain('p-2')
    expect(button.classes()).toContain('rounded-lg')
    expect(button.classes()).toContain('transition-all')
    expect(button.classes()).toContain('duration-300')
  })
})
