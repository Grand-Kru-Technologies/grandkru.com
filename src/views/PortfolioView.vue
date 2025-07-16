<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-12">Our Portfolio</h1>

      <!-- Category Tabs -->
      <div class="flex justify-center mb-12">
        <div class="bg-light-gray rounded-lg p-2 flex space-x-2">
          <button
            v-for="category in categories"
            :key="category.id"
            class="px-6 py-3 rounded-md font-medium transition-all duration-300"
            :class="selectedCategory === category.id
              ? 'bg-primary text-white shadow-lg'
              : 'text-dark-gray hover:text-primary hover:bg-white'"
            @click="selectedCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in filteredPortfolioItems"
          :key="index"
          class="bg-light-gray rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          @click="openModal(item)"
        >
          <div class="relative">
            <img
              :src="item.images[0]"
              :alt="item.title"
              class="w-full h-48 object-cover"
            />
            <div class="absolute top-4 right-4">
              <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ item.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
            <p class="text-dark-gray mb-4">{{ item.summary }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, techIndex) in item.technologies.slice(0, 3)"
                :key="techIndex"
                class="bg-primary bg-opacity-10 text-white px-2 py-1 rounded text-xs font-medium"
              >
                {{ tech }}
              </span>
              <span v-if="item.technologies.length > 3" class="text-dark-gray text-xs">
                +{{ item.technologies.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPortfolioItems.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📁</div>
        <h3 class="text-xl font-bold text-primary mb-2">No projects found</h3>
        <p class="text-dark-gray">We're working on adding more projects to this category.</p>
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
              <div>
                <h2 class="text-3xl font-bold text-primary">{{ selectedItem.title }}</h2>
                <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  {{ selectedItem.category }}
                </span>
              </div>
              <button
                class="text-dark-gray hover:text-primary text-2xl transition-colors duration-300"
                @click="closeModal"
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
                    class="bg-primary bg-opacity-10 text-white-4 py-2 rounded-full text-sm font-medium"
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

interface PortfolioItem {
  title: string
  category: string
  images: string[]
  summary: string
  technologies: string[]
  outcome: string
  details: string
}

const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'websites', name: 'Websites' },
  { id: 'business-processes', name: 'Business Processes' }
]

const portfolioItems = ref<PortfolioItem[]>([
  {
    title: 'E-commerce Platform',
    category: 'websites',
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
    category: 'business-processes',
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
    category: 'business-processes',
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
    category: 'websites',
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
    category: 'websites',
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
    category: 'business-processes',
    images: [
      '../assets/portfolio/finance-1.jpg',
      '../assets/portfolio/finance-2.jpg',
      '../assets/portfolio/finance-3.jpg'
    ],
    summary: 'Real-time financial data visualization and analysis',
    technologies: ['Angular', 'Python', 'TensorFlow', 'D3.js'],
    outcome: 'Enabled data-driven decision making and reduced reporting time by 60%',
    details: 'Built an advanced financial analytics dashboard that provides real-time insights into market trends, portfolio performance, and risk assessment. The system includes predictive analytics and customizable reporting features.'
  },
  {
    title: 'Website Redesign',
    category: 'websites',
    images: [
      '../assets/portfolio/corporate-1.jpg',
      '../assets/portfolio/corporate-2.jpg',
      '../assets/portfolio/corporate-3.jpg'
    ],
    summary: 'Modern, responsive corporate website with enhanced user experience',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
    outcome: 'Improved user engagement by 45% and reduced bounce rate by 30%',
    details: 'Redesigned a corporate website with modern design principles, improved navigation, and enhanced mobile responsiveness. The new site features faster loading times, better SEO optimization, and improved accessibility standards.'
  },
  {
    title: 'Inventory Management System',
    category: 'business-processes',
    images: [
      '../assets/portfolio/inventory-1.jpg',
      '../assets/portfolio/inventory-2.jpg',
      '../assets/portfolio/inventory-3.jpg'
    ],
    summary: 'Automated inventory tracking and management solution',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    outcome: 'Reduced inventory discrepancies by 80% and improved order fulfillment by 50%',
    details: 'Developed a comprehensive inventory management system that automates stock tracking, provides real-time alerts for low inventory, and integrates with existing ERP systems. The solution includes barcode scanning, automated reordering, and detailed reporting capabilities.'
  }
])

const filteredPortfolioItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return portfolioItems.value
  }
  return portfolioItems.value.filter(item => item.category === selectedCategory.value)
})

const selectedItem = ref<PortfolioItem | null>(null)

const openModal = (item: PortfolioItem) => {
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