import { auth } from '../config/firebase'
import { useAuthStore } from '../stores/authStore'

export class AuthService {
  // Initialize auth state listener
  static init() {
    const authStore = useAuthStore()
    authStore.initAuth()
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const authStore = useAuthStore()
    return authStore.isAuthenticated
  }

  // Check if user is admin
  static isAdmin(): boolean {
    const authStore = useAuthStore()
    return authStore.isAdmin
  }

  // Get current user
  static getCurrentUser() {
    const authStore = useAuthStore()
    return authStore.user
  }

  // Sign in with email and password
  static async signInWithEmail(email: string, password: string) {
    const authStore = useAuthStore()
    return await authStore.signInWithEmail(email, password)
  }

  // Sign up with email and password
  static async signUpWithEmail(email: string, password: string) {
    const authStore = useAuthStore()
    return await authStore.signUpWithEmail(email, password)
  }

  // Sign in with Google
  static async signInWithGoogle() {
    const authStore = useAuthStore()
    return await authStore.signInWithGoogle()
  }

  // Sign in with GitHub
  static async signInWithGithub() {
    const authStore = useAuthStore()
    return await authStore.signInWithGithub()
  }

  // Sign out
  static async signOut() {
    const authStore = useAuthStore()
    return await authStore.logout()
  }

  // Clear error
  static clearError() {
    const authStore = useAuthStore()
    authStore.clearError()
  }
}
