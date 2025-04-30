<template>
  <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Enter Password</h2>
      <form @submit.prevent="checkPassword" class="space-y-4">
        <div>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            required
            :disabled="isLocked"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLocked"
        >
          {{ isLocked ? `Try again in ${lockoutTime} seconds` : 'Submit' }}
        </button>
      </form>
      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
      <p v-if="attempts > 0" class="mt-2 text-sm text-gray-500 text-center">
        Attempts remaining: {{ maxAttempts - attempts }}
      </p>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const router = useRouter()
const password = ref('')
const error = ref('')
const isAuthenticated = ref(false)
const attempts = ref(0)
const isLocked = ref(false)
const lockoutTime = ref(0)
const lastAttemptTime = ref(0)

// Security settings
const maxAttempts = 5
const lockoutDuration = 300 // 5 minutes in seconds
const retryDelay = 1000 // 1 second between attempts

// Encrypted password (this is just a placeholder - in production, use a secure server-side solution)
const encryptedPassword = 'U2FsdGVkX1/WuKfAkRKXFXU6sHmMzHwcjENwbhRRYB4='

// Encryption key (in production, this should be stored securely and rotated regularly)
const encryptionKey = '267c90b198ff3b526a9cf32f31493b18de232ee46dcdde5b3088856ee6836792'

const checkPassword = async () => {
  if (isLocked.value) return

  // Check if enough time has passed since last attempt
  const now = Date.now()
  if (now - lastAttemptTime.value < retryDelay) {
    error.value = 'Please wait before trying again'
    return
  }
  lastAttemptTime.value = now

  attempts.value++

  try {
    // Decrypt the stored password
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey).toString(CryptoJS.enc.Utf8)

    if (password.value === decryptedPassword) {
      isAuthenticated.value = true
      // Store encrypted authentication state
      const authToken = CryptoJS.AES.encrypt('authenticated', encryptionKey).toString()
      localStorage.setItem('authToken', authToken)
      error.value = ''
      attempts.value = 0
    } else {
      error.value = 'Incorrect password. Please try again.'

      if (attempts.value >= maxAttempts) {
        isLocked.value = true
        lockoutTime.value = lockoutDuration
        const timer = setInterval(() => {
          lockoutTime.value--
          if (lockoutTime.value <= 0) {
            clearInterval(timer)
            isLocked.value = false
            attempts.value = 0
            error.value = ''
          }
        }, 1000)
      }
    }
  } catch (error) {
    console.error('Decryption error:', error)
    error.value = 'An error occurred. Please try again.'
  }
}

onMounted(() => {
  // Check for existing authentication
  const storedAuthToken = localStorage.getItem('authToken')
  if (storedAuthToken) {
    try {
      const decryptedToken = CryptoJS.AES.decrypt(storedAuthToken, encryptionKey).toString(CryptoJS.enc.Utf8)
      if (decryptedToken === 'authenticated') {
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('Token decryption error:', error)
      localStorage.removeItem('authToken')
    }
  }
})
</script>