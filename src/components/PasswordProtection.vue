<template>
  <div v-if="isStaging && !isAuthenticated" class="password-protection-overlay">
    <div class="password-protection-modal">
      <h2 class="h4 mb-3 text-center">Staging Environment</h2>
      <p class="text-muted text-center mb-4">
        This is a protected staging environment. Please enter the password to continue.
      </p>
      <form @submit.prevent="checkPassword">
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg"
            placeholder="Enter staging password"
            required
            :disabled="isLocked"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-lg w-100"
          :disabled="isLocked"
        >
          {{ isLocked ? `Try again in ${lockoutTime} seconds` : "Submit" }}
        </button>
      </form>
      <p v-if="error" class="mt-3 text-danger text-center">{{ error }}</p>
      <p v-if="attempts > 0" class="mt-2 text-muted text-center small">
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

// Check if we're on staging environment
const isStaging = computed(() => {
  return window.location.hostname === 'staging.grandkru.com' ||
         window.location.hostname.includes('staging') ||
         import.meta.env.VITE_ENVIRONMENT === 'staging'
})

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
  // Debug logging
  console.log('PasswordProtection mounted')
  console.log('Hostname:', window.location.hostname)
  console.log('VITE_ENVIRONMENT:', import.meta.env.VITE_ENVIRONMENT)
  console.log('isStaging:', isStaging.value)

  // If not on staging, skip authentication
  if (!isStaging.value) {
    console.log('Not on staging, bypassing authentication')
    isAuthenticated.value = true
    return
  }

  console.log('On staging, checking authentication')
  // Check for existing authentication
  const storedAuthToken = localStorage.getItem('authToken')
  if (storedAuthToken) {
    try {
      const decryptedToken = CryptoJS.AES.decrypt(storedAuthToken, encryptionKey).toString(CryptoJS.enc.Utf8)
      if (decryptedToken === 'authenticated') {
        console.log('Found valid auth token')
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('Token decryption error:', error)
      localStorage.removeItem('authToken')
    }
  } else {
    console.log('No auth token found, showing password screen')
  }
})
</script>

<style lang="scss" scoped>
@use "@/scss/theming" as *;

.password-protection-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.password-protection-modal {
  background-color: $white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
</style>