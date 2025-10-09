import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the auth store
const mockStore = {
  initAuth: vi.fn(),
  isAuthenticated: true,
  isAdmin: true,
  user: { email: 'test@example.com' },
  signInWithEmail: vi.fn(),
  signUpWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
  signInWithGithub: vi.fn(),
  logout: vi.fn(),
  clearError: vi.fn()
}

vi.mock('../../stores/authStore', () => ({
  useAuthStore: vi.fn(() => mockStore)
}))

describe('AuthService', () => {
  let AuthService: any

  beforeEach(async () => {
    vi.clearAllMocks()
    const module = await import('../authService')
    AuthService = module.AuthService
  })

  describe('init', () => {
    it('should initialize auth state listener', () => {
      AuthService.init()
      expect(mockStore.initAuth).toHaveBeenCalled()
    })
  })

  describe('isAuthenticated', () => {
    it('should return authentication status', () => {
      const result = AuthService.isAuthenticated()
      expect(result).toBe(true)
    })
  })

  describe('isAdmin', () => {
    it('should return admin status', () => {
      const result = AuthService.isAdmin()
      expect(result).toBe(true)
    })
  })

  describe('getCurrentUser', () => {
    it('should return current user', () => {
      const result = AuthService.getCurrentUser()
      expect(result).toEqual({ email: 'test@example.com' })
    })
  })

  describe('signInWithEmail', () => {
    it('should call store signInWithEmail method', async () => {
      await AuthService.signInWithEmail('test@example.com', 'password')
      expect(mockStore.signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password')
    })
  })

  describe('signUpWithEmail', () => {
    it('should call store signUpWithEmail method', async () => {
      await AuthService.signUpWithEmail('test@example.com', 'password')
      expect(mockStore.signUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password')
    })
  })

  describe('signInWithGoogle', () => {
    it('should call store signInWithGoogle method', async () => {
      await AuthService.signInWithGoogle()
      expect(mockStore.signInWithGoogle).toHaveBeenCalled()
    })
  })

  describe('signInWithGithub', () => {
    it('should call store signInWithGithub method', async () => {
      await AuthService.signInWithGithub()
      expect(mockStore.signInWithGithub).toHaveBeenCalled()
    })
  })

  describe('signOut', () => {
    it('should call store logout method', async () => {
      await AuthService.signOut()
      expect(mockStore.logout).toHaveBeenCalled()
    })
  })

  describe('clearError', () => {
    it('should call store clearError method', () => {
      AuthService.clearError()
      expect(mockStore.clearError).toHaveBeenCalled()
    })
  })
})
