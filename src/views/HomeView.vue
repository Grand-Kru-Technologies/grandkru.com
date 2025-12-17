<template>
  <div class="min-h-screen flex items-center py-12">
    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto">
        <!-- Hero Content -->
        <div class="glass-card">
          <p class="text-xl md:text-2xl text-dark-gray dark:text-gray-300 mb-6 leading-relaxed">
            We deliver innovative technology solutions that drive business growth and digital transformation.
          </p>
          <p class="text-lg md:text-xl text-dark-gray dark:text-gray-300 mb-8 leading-relaxed">
            Our expertise spans custom web development, AI-powered automation, financial quality assurance, and e-commerce platforms. We help organizations streamline operations, enhance efficiency, and unlock smarter decision-making through cutting-edge technology.
          </p>
          <div class="flex flex-col sm:flex-row gap-8 justify-center">
            <router-link
              to="/contact"
              class="glass-button text-center"
            >
              Get in Touch
            </router-link>
            <router-link
              to="/services"
              class="glass-button-secondary text-center"
            >
              Our Services
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here
</script>