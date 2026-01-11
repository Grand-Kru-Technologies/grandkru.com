<template>
  <header class="bg-builder-dark-secondary border-b border-builder-border-default sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo with white rounded background -->
        <router-link
          to="/"
          class="logo-container flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          <div class="logo-background bg-white px-4 py-2 flex items-center justify-center">
            <img
              src="../assets/images/cropped_grandkru_logo.png"
              alt="Grand Kru Technologies Logo"
              class="h-10 w-auto transition-opacity duration-300"
            />
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1 relative" ref="navRef">
          <!-- Sliding indicator background -->
          <div
            class="nav-slider absolute rounded-sm transition-all duration-300 ease-out z-0"
            :class="{ 'nav-slider-hover': hoveredIndex !== null, 'nav-slider-active': hoveredIndex === null && activeIndex !== null }"
            :style="sliderStyle"
          ></div>
          
          <!-- Glow effect that follows the slider -->
          <div
            class="nav-slider-glow absolute rounded-sm transition-all duration-300 ease-out z-0"
            :style="sliderGlowStyle"
          ></div>

          <router-link
            v-for="(item, index) in navigationItems"
            :key="item.path"
            :to="item.path"
            :ref="el => { if (el) navLinkRefs[index] = el as HTMLElement }"
            class="nav-link-enhanced text-sm font-medium relative z-10 group"
            :class="{ 'nav-link-active': $route.path === item.path }"
            @mouseenter="handleNavHover(index)"
            @mouseleave="handleNavLeave"
          >
            <span class="relative z-10 block transition-all duration-300 group-hover:scale-110">{{ item.name }}</span>
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button
            class="p-2 rounded-sm transition-all duration-300 hover:bg-builder-dark-tertiary hover:scale-110 active:scale-95 text-builder-foreground-primary"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Toggle menu"
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
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-if="isMenuOpen"
          class="md:hidden border-t border-builder-border-default py-4 space-y-2 bg-builder-dark-secondary"
        >
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="block py-3 px-4 rounded-sm text-builder-foreground-primary transition-all duration-300 relative group hover:bg-builder-dark-tertiary hover:text-builder-accent-primary hover:translate-x-2"
            @click="isMenuOpen = false"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <span
              class="absolute left-0 top-0 bottom-0 w-1 bg-builder-accent-primary transition-all duration-300 opacity-0 group-hover:opacity-100"
              :class="{ 'opacity-100': $route.path === item.path }"
            ></span>
          </router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)
const navLinkRefs = ref<(HTMLElement | null)[]>([])
const hoveredIndex = ref<number | null>(null)
const activeIndex = ref<number | null>(null)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' }
]

const sliderStyle = computed(() => {
  const targetIndex = hoveredIndex.value !== null ? hoveredIndex.value : activeIndex.value

  if (targetIndex === null || !navLinkRefs.value[targetIndex]) {
    return {
      opacity: '0',
      left: '0px',
      width: '0px',
      height: '0px'
    }
  }

  const targetElement = navLinkRefs.value[targetIndex]
  if (!targetElement || !navRef.value) return { opacity: '0', left: '0px', width: '0px', height: '0px' }

  // Check if getBoundingClientRect is available (not available in test environment)
  if (typeof targetElement.getBoundingClientRect !== 'function' ||
      typeof navRef.value.getBoundingClientRect !== 'function') {
    return { opacity: '0', left: '0px', width: '0px', height: '0px' }
  }

  try {
    const navRect = navRef.value.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    const left = targetRect.left - navRect.left
    const width = targetRect.width
    const height = targetRect.height

    return {
      opacity: '1',
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`
    }
  } catch (error) {
    // Fallback for test environments
    return { opacity: '0', left: '0px', width: '0px', height: '0px' }
  }
})

const sliderGlowStyle = computed(() => {
  // Only show glow on hover, not on active
  if (hoveredIndex.value === null) {
    return {
      opacity: '0',
      left: '0px',
      width: '0px'
    }
  }

  const targetIndex = hoveredIndex.value
  if (!navLinkRefs.value[targetIndex]) {
    return {
      opacity: '0',
      left: '0px',
      width: '0px'
    }
  }

  const targetElement = navLinkRefs.value[targetIndex]
  if (!targetElement || !navRef.value) return { opacity: '0', left: '0px', width: '0px' }

  // Check if getBoundingClientRect is available (not available in test environment)
  if (typeof targetElement.getBoundingClientRect !== 'function' ||
      typeof navRef.value.getBoundingClientRect !== 'function') {
    return { opacity: '0', left: '0px', width: '0px' }
  }

  try {
    const navRect = navRef.value.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    const left = targetRect.left - navRect.left
    const width = targetRect.width

    return {
      opacity: '0.3',
      left: `${left}px`,
      width: `${width}px`
    }
  } catch (error) {
    // Fallback for test environments
    return { opacity: '0', left: '0px', width: '0px' }
  }
})

const handleNavHover = (index: number) => {
  hoveredIndex.value = index
}

const handleNavLeave = () => {
  hoveredIndex.value = null
}

const updateActiveIndex = () => {
  const currentPath = route.path
  const index = navigationItems.findIndex(item => item.path === currentPath)
  activeIndex.value = index >= 0 ? index : null
}

// Watch for route changes
watch(() => route.path, () => {
  updateActiveIndex()
}, { immediate: true })

onMounted(async () => {
  await nextTick()
  updateActiveIndex()
})
</script>

<style scoped>
.logo-container {
  @apply relative;
}

.logo-background {
  border-radius: 9999px; /* Fully rounded sides like a pill */
  transition: all 0.3s ease;
}

.logo-container:hover .logo-background {
  @apply shadow-md;
  transform: translateX(2px);
}

.nav-slider {
  pointer-events: none;
  will-change: left, width, opacity, transform, background-color;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.25s ease,
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.3s ease;
  background-color: #1a1a1a; /* builder-dark-tertiary - default/active */
  border-radius: 6px;
}

.nav-slider-hover {
  background-color: rgba(255, 255, 255, 0.3) !important; /* Much lighter highlight on hover - very visible */
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.nav-slider-active {
  background-color: #1a1a1a; /* builder-dark-tertiary for active state */
}

.nav-slider-glow {
  pointer-events: none;
  will-change: left, width, opacity;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.25s ease;
  top: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.4), transparent 70%);
  filter: blur(8px);
  transform: scale(1.2);
}

.nav-link-enhanced {
  @apply text-builder-foreground-primary px-4 py-2 rounded-sm;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-link-enhanced:hover {
  @apply text-builder-accent-primary;
  transform: translateY(-1px);
}

.nav-link-enhanced:active {
  transform: translateY(0) scale(0.98);
}

.nav-link-enhanced.nav-link-active {
  @apply text-builder-accent-primary;
}

.nav-link-enhanced.nav-link-active:hover {
  transform: translateY(-1px);
}
</style>
