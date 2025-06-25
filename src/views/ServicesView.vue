<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-12">Our Services</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          @click="openModal(service)"
        >
          <!-- Background Image with Overlay -->
          <div
            class="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            :style="{ backgroundImage: `url(${service.backgroundImage})` }"
          ></div>

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 opacity-80"
            :class="service.gradient"
          ></div>

          <!-- Content -->
          <div class="relative p-6 text-white">
            <h3 class="text-2xl font-bold mb-4">{{ service.title }}</h3>
            <p class="text-white/90 mb-4">
              {{ service.summary }}
            </p>
            <div class="flex items-center text-white/80 text-sm">
              <span>Learn more</span>
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="selectedService"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out relative"
          @click.stop
        >
          <!-- Modal Header with Background -->
          <div
            class="relative h-32 rounded-t-xl overflow-hidden"
            :style="{ backgroundImage: `url(${selectedService.backgroundImage})` }"
          >
            <div
              class="absolute inset-0 opacity-60"
              :class="selectedService.gradient"
            ></div>
            <div class="relative p-6 flex justify-between items-start">
              <h2 class="text-3xl font-bold text-white">{{ selectedService.title }}</h2>
              <button
                @click="closeModal"
                class="text-white hover:text-gray-200 text-2xl bg-black/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/30 transition-colors duration-300"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6 space-y-6">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import techImage1 from '../assets/images/technology-8576308.jpg'
import techImage2 from '../assets/images/technology-8576321.jpg'
import keyboardImage from '../assets/images/keyboard.jpg'
import desktopImage from '../assets/images/desktop.jpg'
import geometricImage from '../assets/images/geometric-1732847.jpg'

interface Service {
  title: string;
  summary: string;
  details: string;
  features: string[];
  technologies: string[];
  gradient: string;
  backgroundImage: string;
}

const services = ref<Service[]>([
  {
    title: 'Web Development',
    summary: 'Custom web applications and websites built with modern technologies for optimal performance and user experience.',
    details: 'We specialize in creating cutting-edge web applications and websites that drive business growth. Our development process combines modern frameworks with best practices to deliver scalable, maintainable, and high-performing solutions. From single-page applications to complex enterprise systems, we ensure your web presence is not only visually stunning but also technically robust and future-ready.',
    features: [
      'Custom web application development',
      'Responsive design implementation',
      'Performance optimization',
      'SEO-friendly architecture',
      'Cross-browser compatibility'
    ],
    technologies: ['Vue.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    gradient: 'bg-gradient-to-br from-blue-600 to-purple-700',
    backgroundImage: techImage1
  },
  {
    title: 'AI Automation',
    summary: 'Intelligent automation solutions powered by artificial intelligence to streamline operations and boost productivity.',
    details: 'Our AI Automation services leverage cutting-edge machine learning and artificial intelligence to transform your business processes. We develop intelligent systems that can learn, adapt, and optimize workflows automatically. From data processing and analysis to customer service automation, our AI solutions help businesses reduce manual work, minimize errors, and focus on strategic initiatives.',
    features: [
      'Machine learning model development',
      'Natural language processing',
      'Predictive analytics',
      'Automated decision-making systems',
      'Intelligent workflow optimization'
    ],
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'Machine Learning', 'Data Analytics', 'Cloud AI'],
    gradient: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    backgroundImage: techImage2
  },
  {
    title: 'Financial Quality Assurance',
    summary: 'AI-powered financial oversight and optimization for enhanced accuracy, compliance, and strategic decision-making.',
    details: 'Our Financial Quality Assurance service is designed to bring together expert financial oversight with cutting-edge technology. Beyond traditional bookkeeping, we use AI-assisted tools for auditing, planning, implementation, and continuous optimization. Our service identifies inconsistencies early, streamlines financial workflows, strengthens internal controls, and enhances regulatory compliance — all while delivering real-time insights through intelligent automation. By integrating predictive analytics, automated reporting, and proactive monitoring, we help businesses maintain financial accuracy, reduce risks, and unlock smarter decision-making.',
    features: [
      'AI-assisted financial auditing',
      'Real-time financial insights',
      'Predictive analytics integration',
      'Automated compliance monitoring',
      'Risk assessment and mitigation'
    ],
    technologies: ['AI/ML', 'QuickBooks', 'Financial Analytics', 'Zapier', 'Compliance Systems', 'Data Visualization'],
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-700',
    backgroundImage: geometricImage
  },
  {
    title: 'E-Commerce',
    summary: 'Complete e-commerce solutions with custom payment processing, inventory management, and seamless user experiences.',
    details: 'We build comprehensive e-commerce platforms that drive sales and enhance customer experience. Our solutions include custom payment gateway integration, advanced inventory management, and real-time analytics. From small online stores to enterprise-level marketplaces, we create scalable e-commerce systems that grow with your business and provide exceptional shopping experiences across all devices.',
    features: [
      'Custom payment gateway integration',
      'Advanced inventory management',
      'Real-time analytics dashboard',
      'Mobile-responsive design',
      'Secure checkout process'
    ],
    technologies: ['WordPress', 'WooCommerce', 'Stripe', 'Gravity Forms', 'PHP', 'Payment APIs'],
    gradient: 'bg-gradient-to-br from-orange-600 to-red-600',
    backgroundImage: keyboardImage
  },
  {
    title: 'Business Process Automation',
    summary: 'Technology-driven workflow optimization and automation for enhanced operational efficiency and cost savings.',
    details: 'We specialize in Business Process Automation by leveraging the latest technology tools to analyze, plan, and implement efficient, scalable solutions. Our approach starts with a deep analysis of existing workflows, identifying bottlenecks and opportunities for improvement. We design automation strategies tailored to each organization\'s goals, ensuring seamless integration into daily operations while supporting broader organizational development.',
    features: [
      'Workflow analysis and optimization',
      'Custom automation strategies',
      'Seamless system integration',
      'Organizational change management',
      'Performance monitoring and analytics'
    ],
    technologies: ['Process Automation', 'Workflow Management', 'Data Analytics', 'Integration Tools', 'RPA', 'API Development'],
    gradient: 'bg-gradient-to-br from-indigo-600 to-purple-700',
    backgroundImage: desktopImage
  }
])

const selectedService = ref<Service | null>(null)

const openModal = (service: Service) => {
  selectedService.value = service
}

const closeModal = () => {
  selectedService.value = null
}
</script>