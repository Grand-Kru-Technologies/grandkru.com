<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-12">Our Services</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-light-gray p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
          @click="openModal(service)"
        >
          <h3 class="text-2xl font-bold text-primary mb-4">{{ service.title }}</h3>
          <p class="text-dark-gray mb-4">
            {{ service.summary }}
          </p>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="selectedService"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out relative"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-3xl font-bold text-primary">{{ selectedService.title }}</h2>
              <button
                @click="closeModal"
                class="text-dark-gray hover:text-primary text-2xl"
              >
                ✕
              </button>
            </div>
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Service Overview</h3>
                <p class="text-dark-gray text-lg">{{ selectedService.summary }}</p>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Detailed Description</h3>
                <p class="text-dark-gray">{{ selectedService.details }}</p>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Key Features</h3>
                <ul class="list-disc list-inside text-dark-gray space-y-2">
                  <li v-for="(feature, index) in selectedService.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-3">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in selectedService.technologies"
                    :key="index"
                    class="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
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

const services = ref([
  {
    title: 'E-commerce Implementation',
    summary: 'Custom e-commerce solutions using WordPress, Gravity Forms, and Stripe integration for seamless online transactions.',
    details: 'We specialize in creating robust e-commerce platforms that drive sales and enhance customer experience. Our solutions include custom payment processing, inventory management, and analytics integration.',
    features: [
      'Custom payment gateway integration',
      'Advanced inventory management',
      'Real-time analytics dashboard',
      'Mobile-responsive design',
      'Secure checkout process'
    ],
    technologies: ['WordPress', 'Gravity Forms', 'Stripe', 'PHP', 'MySQL']
  },
  {
    title: 'Unified Travel Platform',
    summary: 'Comprehensive travel platform development with requirements analysis and discovery phase for optimal user experience.',
    details: 'Our travel platform solutions streamline the booking process and provide a seamless experience for both travelers and administrators.',
    features: [
      'Multi-destination booking system',
      'Real-time availability checking',
      'Automated confirmation process',
      'User-friendly interface',
      'Comprehensive admin dashboard'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API']
  },
  {
    title: 'Licensing Model Development',
    summary: 'Custom licensing solutions with Rails API backend and NodeJS frontend for scalable software distribution.',
    details: 'We develop secure and scalable licensing systems that protect your software while providing a seamless user experience.',
    features: [
      'Multiple license types support',
      'Automated activation process',
      'Usage tracking and analytics',
      'Anti-piracy measures',
      'License key management'
    ],
    technologies: ['Ruby on Rails', 'Node.js', 'PostgreSQL', 'JWT']
  },
  {
    title: 'Database Optimization',
    summary: 'Performance optimization for PostgreSQL databases with parallel processing capabilities.',
    details: 'Our database optimization services ensure your applications run at peak performance with efficient data handling.',
    features: [
      'Query optimization',
      'Index tuning',
      'Parallel processing setup',
      'Performance monitoring',
      'Data migration support'
    ],
    technologies: ['PostgreSQL', 'SQL', 'Database Design', 'Performance Tuning']
  },
  {
    title: 'Technical Training',
    summary: 'Comprehensive training programs in HTML, JavaScript, and CSS for professional development.',
    details: 'We provide hands-on technical training programs designed to enhance your team\'s development skills.',
    features: [
      'Customized curriculum',
      'Hands-on projects',
      'Real-world scenarios',
      'Progress tracking',
      'Certification preparation'
    ],
    technologies: ['HTML', 'JavaScript', 'CSS', 'Web Development', 'Training']
  },
  {
    title: 'Curriculum Development',
    summary: 'Custom curriculum design and updates for coding bootcamps and technical education programs.',
    details: 'We create comprehensive technical education programs that prepare students for real-world development challenges.',
    features: [
      'Industry-aligned content',
      'Project-based learning',
      'Assessment tools',
      'Progress tracking',
      'Regular updates'
    ],
    technologies: ['Curriculum Design', 'Educational Technology', 'Assessment Tools']
  }
])

const selectedService = ref(null)

const openModal = (service) => {
  selectedService.value = service
}

const closeModal = () => {
  selectedService.value = null
}
</script>