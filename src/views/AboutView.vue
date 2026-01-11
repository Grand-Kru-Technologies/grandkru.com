<template>
  <div class="min-h-screen bg-builder-dark-primary">
    <!-- Hero Section -->
    <section class="bg-builder-dark-primary py-20 border-b border-builder-border-default">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h1 class="mb-4">About Us</h1>
          <p class="text-lg leading-normal text-builder-foreground-secondary max-w-2xl mx-auto">
            Pioneering excellence in technology solutions for businesses worldwide
          </p>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="../assets/images/desktop.jpg"
              alt="Grand Kru Technologies"
              class="w-full rounded-sm shadow-default"
            />
          </div>
          <div>
            <h5 class="text-h5 text-builder-foreground-primary mb-2">Our Story</h5>
            <h2 class="mb-4 text-builder-foreground-primary">Pioneering Excellence in Tech for Over 10 Years</h2>
            <p class="text-base leading-normal text-builder-foreground-primary mb-6">
              Grand Kru Technologies bridges traditional business with digital innovation, empowering organizations through modern technology. Our experienced team delivers scalable solutions in web, mobile, cloud, and AI to drive growth and efficiency.
            </p>
            <p class="text-base leading-normal text-builder-foreground-primary">
              We build lasting partnerships by working closely with clients, combining technical expertise and business insight. Whether you're a startup or an enterprise, we help you navigate digital transformation with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Goal Section -->
    <section class="bg-builder-dark-primary py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h5 class="text-h5 text-builder-foreground-primary mb-2">Mission & Goal</h5>
            <h2 class="mb-4 text-builder-foreground-primary">A Commitment to Excellence, Crafting Our Legacy!</h2>
            <p class="text-base leading-normal text-builder-foreground-primary mb-8">
              Our mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal text-builder-foreground-primary">
                  Innovation-driven solutions
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal text-builder-foreground-primary">
                  Client-focused approach
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal text-builder-foreground-primary">
                  Scalable technology
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal text-builder-foreground-primary">
                  Continuous improvement
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="../assets/images/technology-8576308.jpg"
              alt="Technology Solutions"
              class="w-full rounded-sm shadow-default"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center bg-builder-dark-primary rounded-sm p-12 border border-builder-border-default">
          <h2 class="mb-4 text-builder-foreground-primary">Ready to Work With Us?</h2>
          <p class="text-base leading-normal text-builder-foreground-secondary mb-8">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <router-link to="/contact" class="glass-button">
            Get in Touch
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>
