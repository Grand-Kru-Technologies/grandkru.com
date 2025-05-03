<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-16">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="md:w-1/2 mb-8 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to Grand Kru Technologies
          </h1>
          <p class="text-lg text-dark-gray mb-6">
            We specialize in delivering innovative technology solutions that drive business growth and digital transformation.
          </p>
          <div class="flex gap-4">
            <router-link
              to="/contact"
              class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get in Touch
            </router-link>
          </div>
        </div>
        <div class="md:w-1/2">
          <img
            src="../assets/Grand-Kru-Technologies_grandkrusplash_9237.png"
            alt="Grandkru Technologies Logo"
            class="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here
</script>