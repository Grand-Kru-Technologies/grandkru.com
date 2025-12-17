<template>
  <nav class="glass w-full z-50 relative">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center transition-transform duration-300 hover:scale-105 relative z-10">
          <img
            src="../assets/images/cropped_grandkru_logo.png"
            alt="Grandkru Technologies Logo"
            class="h-12 w-auto"
          />
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link group"
            :class="{ 'nav-link-active': $route.path === item.path }"
          >
            <span class="inline-block transition-transform duration-300 group-hover:scale-110">{{ item.name }}</span>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-3">
          <button
            class="p-2.5 glass-strong rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/25 dark:hover:bg-gray-800/50 text-dark-gray dark:text-gray-100"
            aria-label="Toggle menu"
            @click="isMenuOpen = !isMenuOpen"
          >
          <svg
            class="w-6 h-6 transition-transform duration-300"
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden glass-strong rounded-2xl mt-4 p-6 animate-slide-up"
        >
          <div class="flex flex-col space-y-4">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="nav-link text-center py-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:translate-x-2"
              :class="{ 'nav-link-active bg-white/10 dark:bg-gray-800/50': $route.path === item.path }"
              @click="isMenuOpen = false"
            >
              <span class="inline-block transition-transform duration-300">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NavigationItem {
  name: string
  path: string
}

const isMenuOpen = ref(false)

const navigationItems: NavigationItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
]
</script>
