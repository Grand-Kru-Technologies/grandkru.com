import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../config/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => {
    // Add admin email check logic here
    return user.value?.email === 'admin@grandkru.com' ||
           user.value?.email === 'mnyon@grandkru.com'
  })

  // Initialize auth state listener
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  // Email/password authentication
  const signInWithEmail = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // OAuth authentication
  const signInWithGoogle = async () => {
    try {
      loading.value = true
      error.value = null
      await signInWithPopup(auth, googleProvider)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signInWithGithub = async () => {
    try {
      loading.value = true
      error.value = null
      await signInWithPopup(auth, githubProvider)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Sign out
  const logout = async () => {
    try {
      loading.value = true
      error.value = null
      await signOut(auth)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
    logout,
    clearError
  }
})
