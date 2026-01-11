<template>
  <div class="min-h-screen bg-builder-dark-primary">
    <!-- Hero Section -->
    <section class="bg-builder-dark-primary py-20 border-b border-builder-border-card">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h1 class="mb-4 text-builder-foreground-primary">Our Portfolio</h1>
          <p class="text-lg leading-normal text-builder-foreground-secondary max-w-2xl mx-auto">
            Explore our successful technology implementations and client projects
          </p>
        </div>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="py-20 bg-builder-dark-primary">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in portfolioItems"
            :key="index"
            class="bg-builder-card border border-builder-border-card rounded-xl overflow-hidden hover:shadow-card hover:bg-builder-cardHover transition-all duration-200 cursor-pointer group"
            @click="openModal(item)"
          >
            <div class="aspect-video bg-builder-dark-tertiary"></div>
            <div class="p-6">
              <h3 class="text-h5 mb-2 text-builder-foreground-onCard group-hover:text-builder-accent-primaryHover transition-colors duration-200">
                {{ item.title }}
              </h3>
              <p class="text-sm leading-normal text-builder-foreground-onCard opacity-80">
                {{ item.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      v-if="selectedItem"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-builder-dark-primary rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg transform transition-all duration-150 relative"
        @click.stop
      >
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-h2 text-builder-foreground-primary">{{ selectedItem.title }}</h2>
            <button
              @click="closeModal"
              class="text-builder-foreground-secondary hover:text-builder-accent-primaryHover text-2xl transition-colors duration-150"
              aria-label="Close modal"
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
                <div class="w-full h-80 bg-builder-dark-tertiary rounded-sm"></div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>

          <div class="space-y-8">
            <div>
              <h3 class="text-h4 text-builder-foreground-primary mb-4">Project Overview</h3>
              <p class="text-base leading-normal text-builder-foreground-primary">{{ selectedItem.summary }}</p>
            </div>
            <div>
              <h3 class="text-h4 text-builder-foreground-primary mb-4">Detailed Description</h3>
              <p class="text-base leading-normal text-builder-foreground-primary">{{ selectedItem.details }}</p>
            </div>
            <div>
              <h3 class="text-h4 text-builder-foreground-primary mb-4">Technologies Used</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tech, index) in selectedItem.technologies"
                  :key="index"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="text-h4 text-builder-foreground-primary mb-4">Key Outcomes</h3>
              <p class="text-base leading-normal text-builder-foreground-primary">{{ selectedItem.outcome }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const selectedItem = ref<any>(null)

const openModal = (item: any) => {
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
  border: 5px solid #3858e9;
}

.carousel__pagination-button {
  background-color: #171717;
}

.carousel__pagination-button--active {
  background-color: #171717;
}

.dark .carousel__pagination-button {
  background-color: #ededed;
}

.dark .carousel__pagination-button--active {
  background-color: #ededed;
}
</style>
