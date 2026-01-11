<template>
  <PasswordProtection>
    <!-- Temporary debug info -->
    <div v-if="isDev" class="fixed top-0 right-0 bg-red-500 text-white p-2 text-xs z-50">
      <div>VITE_ENVIRONMENT: {{ viteEnvironment }}</div>
      <div>Hostname: {{ currentHostname }}</div>
      <div>Is Staging: {{ isStaging }}</div>
    </div>

    <div class="min-h-screen bg-builder-dark-primary transition-colors duration-200 flex flex-col">
      <Navigation />
      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <Footer />
    </div>
  </PasswordProtection>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import PasswordProtection from './components/PasswordProtection.vue'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Dark mode only - no toggle needed

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