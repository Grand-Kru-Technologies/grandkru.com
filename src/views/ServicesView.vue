<template>
  <div class="min-h-screen bg-builder-dark-primary">
    <!-- Hero Section -->
    <section class="bg-builder-dark-primary py-20 border-b border-builder-border-card">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h1 class="mb-4 text-builder-foreground-primary">Our Services</h1>
          <p class="text-lg leading-normal text-builder-foreground-secondary max-w-2xl mx-auto">
            Comprehensive technology solutions designed to drive your business forward
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 bg-builder-dark-primary">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="bg-builder-dark-primary border border-builder-border-card rounded-sm p-8 hover:shadow-default transition-all duration-150 cursor-pointer group"
            @click="openModal(service)"
          >
            <div class="w-16 h-16 rounded-lg mb-6 flex items-center justify-center bg-builder-dark-tertiary">
              <svg class="w-8 h-8 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-h4 mb-4 group-hover:text-gray-600 group-hover:text-builder-accent-primaryHover transition-colors duration-150">
              {{ service.title }}
            </h3>
            <p class="text-base leading-normal text-builder-foreground-secondary mb-6">
              {{ service.summary }}
            </p>
            <div class="flex items-center text-builder-foreground-primary text-sm font-medium">
              <span>Learn more</span>
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      v-if="selectedService"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-builder-dark-primary rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg transform transition-all duration-150 relative"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gray-50 bg-builder-dark-tertiary border-b border-builder-border-card p-6 flex justify-between items-start">
          <h2 class="text-h2 text-builder-foreground-primary">{{ selectedService.title }}</h2>
          <button
            @click="closeModal"
            class="text-builder-foreground-secondary hover:text-builder-accent-primaryHover text-2xl transition-colors duration-150"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-8">
          <div>
            <h3 class="text-h4 text-builder-foreground-primary mb-4">Service Overview</h3>
            <p class="text-base leading-normal text-builder-foreground-primary">{{ selectedService.summary }}</p>
          </div>
          <div>
            <h3 class="text-h4 text-builder-foreground-primary mb-4">Detailed Description</h3>
            <p class="text-base leading-normal text-builder-foreground-primary">{{ selectedService.details }}</p>
          </div>
          <div>
            <h3 class="text-h4 text-builder-foreground-primary mb-4">Key Features</h3>
            <ul class="list-disc list-inside space-y-2 text-base leading-normal text-builder-foreground-primary">
              <li v-for="(feature, index) in selectedService.features" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-h4 text-builder-foreground-primary mb-4">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, index) in selectedService.technologies"
                :key="index"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="pt-4 border-t border-builder-border-card">
            <router-link
              to="/contact"
              class="glass-button inline-block"
            >
              Get Started
            </router-link>
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
  iconBg: string;
  iconColor: string;
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
    technologies: ['WordPress', 'Rails', 'Node.JS', 'APIs', 'Cloud', 'Frontend'],
    iconBg: 'bg-primary-blueberry-4',
    iconColor: 'text-link',
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
    technologies: ['Zapier', 'Make', 'OpenAI API', 'Machine Learning', 'Data Analytics'],
    iconBg: 'bg-builder-dark-tertiary',
    iconColor: 'text-builder-foreground-primary',
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
    technologies: ['AI/ML', 'QuickBooks', 'Financial Analytics', 'Reconciliation', 'Compliance Systems', 'Data Visualization'],
    iconBg: 'bg-builder-dark-tertiary',
    iconColor: 'text-builder-foreground-primary',
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
    technologies: ['WordPress', 'WooCommerce', 'Stripe', 'PayPal', 'PHP', 'Payment APIs'],
    iconBg: 'bg-builder-dark-tertiary',
    iconColor: 'text-builder-foreground-primary',
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
    iconBg: 'bg-builder-dark-tertiary',
    iconColor: 'text-builder-foreground-primary',
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
