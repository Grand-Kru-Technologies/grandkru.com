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
            :src="item.images[0]"
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out relative"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-3xl font-bold text-primary">{{ selectedItem.title }}</h2>
              <button
                @click="closeModal"
                class="text-dark-gray hover:text-primary text-2xl"
              >
                ✕
              </button>
            </div>

            <!-- Carousel -->
            <Carousel
              :items-to-show="1"
              :wrap-around="true"
              :autoplay="3000"
              class="mb-8"
            >
              <Slide v-for="(image, index) in selectedItem.images" :key="index">
                <div class="carousel__item">
                  <img
                    :src="image"
                    :alt="selectedItem.title"
                    class="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </Slide>

              <template #addons>
                <Navigation />
                <Pagination />
              </template>
            </Carousel>

            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Project Overview</h3>
                <p class="text-dark-gray text-lg">{{ selectedItem.summary }}</p>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Detailed Description</h3>
                <p class="text-dark-gray">{{ selectedItem.details }}</p>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in selectedItem.technologies"
                    :key="index"
                    class="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Key Outcomes</h3>
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
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const portfolioItems = ref([
  {
    title: 'E-commerce Platform',
    images: [
      '../assets/portfolio/ecommerce-1.jpg',
      '../assets/portfolio/ecommerce-2.jpg',
      '../assets/portfolio/ecommerce-3.jpg'
    ],
    summary: 'A comprehensive e-commerce solution with integrated payment processing',
    technologies: ['WordPress', 'Gravity Forms', 'Stripe', 'PHP'],
    outcome: 'Increased online sales by 200% and improved customer satisfaction',
    details: 'Developed a custom e-commerce platform with advanced inventory management, automated order processing, and seamless payment integration. The platform supports multiple payment gateways and provides real-time analytics for business insights.'
  },
  {
    title: 'Travel Management System',
    images: [
      '../assets/portfolio/travel-1.jpg',
      '../assets/portfolio/travel-2.jpg',
      '../assets/portfolio/travel-3.jpg'
    ],
    summary: 'Unified platform for travel booking and management',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    outcome: 'Streamlined booking process and reduced operational costs by 30%',
    details: 'Created a full-featured travel management system that handles flight bookings, hotel reservations, and itinerary management. The system includes a user-friendly interface, real-time availability checking, and automated confirmation processes.'
  },
  {
    title: 'Software Licensing System',
    images: [
      '../assets/portfolio/licensing-1.jpg',
      '../assets/portfolio/licensing-2.jpg',
      '../assets/portfolio/licensing-3.jpg'
    ],
    summary: 'Custom licensing solution for software distribution',
    technologies: ['Ruby on Rails', 'Node.js', 'PostgreSQL'],
    outcome: 'Enabled scalable software distribution and improved license management',
    details: 'Built a robust licensing system that supports various license types, automated activation, and usage tracking. The system includes anti-piracy measures and provides detailed analytics on software usage patterns.'
  },
  {
    title: 'Healthcare Management Platform',
    images: [
      '../assets/portfolio/healthcare-1.jpg',
      '../assets/portfolio/healthcare-2.jpg',
      '../assets/portfolio/healthcare-3.jpg'
    ],
    summary: 'Integrated healthcare management and patient care system',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
    outcome: 'Improved patient care coordination and reduced administrative overhead by 40%',
    details: 'Developed a comprehensive healthcare management platform that streamlines patient records, appointment scheduling, and medical billing. The system includes HIPAA-compliant data security and real-time communication features.'
  },
  {
    title: 'Educational Learning Platform',
    images: [
      '../assets/portfolio/education-1.jpg',
      '../assets/portfolio/education-2.jpg',
      '../assets/portfolio/education-3.jpg'
    ],
    summary: 'Interactive online learning environment',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    outcome: 'Enhanced student engagement and improved learning outcomes by 35%',
    details: 'Created an engaging educational platform with interactive lessons, real-time collaboration tools, and progress tracking. The system supports various content types and includes gamification elements to boost student motivation.'
  },
  {
    title: 'Financial Analytics Dashboard',
    images: [
      '../assets/portfolio/finance-1.jpg',
      '../assets/portfolio/finance-2.jpg',
      '../assets/portfolio/finance-3.jpg'
    ],
    summary: 'Real-time financial data visualization and analysis',
    technologies: ['Angular', 'Python', 'TensorFlow', 'D3.js'],
    outcome: 'Enabled data-driven decision making and reduced reporting time by 60%',
    details: 'Built an advanced financial analytics dashboard that provides real-time insights into market trends, portfolio performance, and risk assessment. The system includes predictive analytics and customizable reporting features.'
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

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__pagination-button {
  background-color: var(--primary);
}

.carousel__pagination-button--active {
  background-color: var(--primary);
}
</style>