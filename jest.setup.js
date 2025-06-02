import { config } from '@vue/test-utils'

// Configure Vue Test Utils
config.global.stubs = {
  transition: false,
  'router-link': true,
  'router-view': true
}

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      VITE_EMAILJS_SERVICE_ID: 'test-service-id',
      VITE_EMAILJS_TEMPLATE_ID: 'test-template-id',
      VITE_EMAILJS_PUBLIC_KEY: 'test-public-key'
    }
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() { return null }
  unobserve() { return null }
  disconnect() { return null }
}