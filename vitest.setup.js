import { vi } from 'vitest'

// Mock crypto for Node.js environment
if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: (buffer) => {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256)
      }
      return buffer
    }
  }
}

// Mock window for Node.js environment
if (typeof window === 'undefined') {
  global.window = {
    location: {
      href: '',
      pathname: '',
      search: '',
      hash: ''
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }
}