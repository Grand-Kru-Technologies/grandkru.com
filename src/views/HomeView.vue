<template>
  <div class="min-h-screen pt-24 pb-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="md:w-1/2">
          <div class="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
              Grand Kru Technologies
            </h1>
            <p class="text-lg text-dark-gray mb-6 text-center md:text-left">
              We specialize in delivering innovative technology solutions that <br>
              drive business growth and digital transformation.
            </p>
            <div class="flex gap-4 justify-center md:justify-start">
              <router-link
                to="/contact"
                class="glass-button"
              >
                Get in Touch
              </router-link>
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <img
            src="../assets/images/desktop.jpg"
            alt="Grandkru Technologies Logo"
            class="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here
</script>