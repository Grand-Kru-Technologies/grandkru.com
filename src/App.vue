<template>
  <!-- <PasswordProtection> -->
    <div class="min-h-screen bg-white">
      <Navigation />
      <main class="container mx-auto px-4 py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  <!-- </PasswordProtection> -->
</template>

<script setup>
import Navigation from './components/Navigation.vue'
import PasswordProtection from './components/PasswordProtection.vue'
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