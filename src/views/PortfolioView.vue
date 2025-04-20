<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-12">Our Portfolio</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Portfolio Item 1 -->
        <div
          v-for="(item, index) in portfolioItems"
          :key="index"
          class="bg-light-gray rounded-lg overflow-hidden shadow-lg cursor-pointer"
          @click="openModal(item)"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
            <p class="text-dark-gray">{{ item.summary }}</p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-3xl font-bold text-primary">{{ selectedItem.title }}</h2>
              <button
                @click="closeModal"
                class="text-dark-gray hover:text-primary"
              >
                ✕
              </button>
            </div>
            <img
              :src="selectedItem.image"
              :alt="selectedItem.title"
              class="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">Summary</h3>
                <p class="text-dark-gray">{{ selectedItem.summary }}</p>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in selectedItem.technologies"
                    :key="index"
                    class="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">Outcome</h3>
                <p class="text-dark-gray">{{ selectedItem.outcome }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const portfolioItems = ref([
  {
    title: 'E-commerce Platform',
    image: '../assets/portfolio/ecommerce.jpg',
    summary: 'A comprehensive e-commerce solution with integrated payment processing',
    technologies: ['WordPress', 'Gravity Forms', 'Stripe', 'PHP'],
    outcome: 'Increased online sales by 200% and improved customer satisfaction'
  },
  {
    title: 'Travel Management System',
    image: '../assets/portfolio/travel.jpg',
    summary: 'Unified platform for travel booking and management',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    outcome: 'Streamlined booking process and reduced operational costs by 30%'
  },
  {
    title: 'Software Licensing System',
    image: '../assets/portfolio/licensing.jpg',
    summary: 'Custom licensing solution for software distribution',
    technologies: ['Ruby on Rails', 'Node.js', 'PostgreSQL'],
    outcome: 'Enabled scalable software distribution and improved license management'
  }
])

const selectedItem = ref(null)

const openModal = (item) => {
  selectedItem.value = item
}

const closeModal = () => {
  selectedItem.value = null
}
</script>