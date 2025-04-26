<template>
  <div v-if="!authenticated" class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-xs w-full">
      <h2 class="text-2xl font-bold mb-4 text-center">Enter Password</h2>
      <input
        v-model="inputPassword"
        type="password"
        placeholder="Password"
        class="w-full px-4 py-2 border border-medium-gray rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        @keyup.enter="checkPassword"
        autofocus
      />
      <button
        @click="checkPassword"
        class="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Submit
      </button>
      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">Incorrect password. Please try again.</p>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const PASSWORD = 'therulersback'
const STORAGE_KEY = 'grandkru_authenticated'

const inputPassword = ref('')
const authenticated = ref(false)
const error = ref(false)

onMounted(() => {
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    authenticated.value = true
  }
})

function checkPassword() {
  if (inputPassword.value === PASSWORD) {
    authenticated.value = true
    localStorage.setItem(STORAGE_KEY, 'true')
    error.value = false
  } else {
    error.value = true
    inputPassword.value = ''
  }
}
</script>