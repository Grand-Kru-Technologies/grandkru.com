<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img
            src="../assets/grandkru_logo.png"
            alt="Grandkru Technologies Logo"
            class="h-12 w-auto"
          />
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-dark-gray hover:text-primary transition-colors"
            :class="{ 'text-primary': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMenuOpen"
        class="md:hidden py-4 space-y-2"
      >
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block text-dark-gray hover:text-primary transition-colors"
          :class="{ 'text-primary': $route.path === item.path }"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' }
]
</script>