<template>
  <PasswordProtection>
    <!-- Temporary debug info -->
    <div v-if="isDev" class="fixed top-0 right-0 bg-red-500 text-white p-2 text-xs z-50">
      <div>VITE_ENVIRONMENT: {{ viteEnvironment }}</div>
      <div>Hostname: {{ currentHostname }}</div>
      <div>Is Staging: {{ isStaging }}</div>
    </div>

    <div class="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navigation />
      <main class="container mx-auto px-4 py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

    </div>
  </PasswordProtection>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import PasswordProtection from './components/PasswordProtection.vue'
import ChatWidget from './components/chat/ChatWidget.vue'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

// Initialize dark mode
useDarkMode()

const route = useRoute()
const currentHostname = ref('')
const viteEnvironment = ref('')
const isDev = ref(false)

const isStaging = computed(() => {
  return currentHostname.value === 'staging.grandkru.com' ||
         currentHostname.value.includes('staging') ||
         viteEnvironment.value === 'staging'
})

const isAdminPage = computed(() => {
  return route.path.startsWith('/admin')
})

onMounted(() => {
  currentHostname.value = window.location.hostname
  viteEnvironment.value = import.meta.env.VITE_ENVIRONMENT || ''
  isDev.value = import.meta.env.DEV || false
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>