import * as Vue from 'vue'
import { config } from '@vue/test-utils'

// Make Vue available globally
global.Vue = Vue

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
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
}

// Configure Vue Test Utils
config.global.stubs = {
  transition: false,
  'router-link': true,
  'router-view': true
}