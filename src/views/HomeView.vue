<template>
  <div class="min-h-screen bg-builder-dark-primary">
    <!-- Hero Section -->
    <section class="bg-builder-dark-primary py-20 md:py-32">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h1 class="mb-6 text-builder-foreground-primary">
            Evolve & Grow With Grand Kru Technologies
          </h1>
          <p class="text-lg md:text-xl leading-normal text-builder-foreground-secondary mb-8 max-w-2xl mx-auto">
            We specialize in delivering innovative technology solutions that drive business growth and digital transformation.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/contact" class="glass-button">
              Get Started Today
            </router-link>
            <router-link to="/services" class="glass-button-outline">
              Our Services
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-builder-dark-primary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center mb-16">
          <h2 class="mb-4 text-builder-foreground-primary">We Provide The Best Services At Grand Kru Technologies</h2>
          <p class="text-lg leading-normal text-builder-foreground-secondary">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        <!-- Services Slider -->
        <div class="relative">
          <!-- Left Arrow -->
          <button
            @click="prevService"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-builder-dark-secondary border border-builder-border-default rounded-full flex items-center justify-center text-builder-foreground-primary hover:bg-builder-dark-tertiary hover:text-builder-accent-primary transition-all duration-200 shadow-lg"
            aria-label="Previous service"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Slider Container -->
          <div class="overflow-hidden mx-8">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentServiceIndex * (100 / visibleServices)}%)` }"
            >
              <div
                v-for="(service, index) in featuredServices"
                :key="index"
                class="flex-shrink-0 px-3"
                :style="{ width: `${100 / visibleServices}%` }"
              >
                <div class="bg-builder-card border border-builder-border-card rounded-xl p-6 hover:shadow-card hover:bg-builder-cardHover transition-all duration-200 h-full">
                  <div class="w-16 h-16 bg-builder-dark-tertiary rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                    </svg>
                  </div>
                  <h3 class="service-card-title text-h4 mb-3 text-builder-foreground-onCard">{{ service.title }}</h3>
                  <p class="text-sm leading-normal text-builder-foreground-onCard opacity-80 mb-4">
                    {{ service.description }}
                  </p>
                  <router-link
                    to="/services"
                    class="text-builder-accent-primary text-sm font-medium hover:text-builder-accent-primaryHover transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Read More
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Arrow -->
          <button
            @click="nextService"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-builder-dark-secondary border border-builder-border-default rounded-full flex items-center justify-center text-builder-foreground-primary hover:bg-builder-dark-tertiary hover:text-builder-accent-primary transition-all duration-200 shadow-lg"
            aria-label="Next service"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="(_, index) in totalSlides"
              :key="index"
              @click="goToService(index)"
              class="w-3 h-3 rounded-full transition-all duration-200"
              :class="currentServiceIndex === index ? 'bg-builder-accent-primary w-8' : 'bg-builder-border-default hover:bg-builder-foreground-tertiary'"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="../assets/images/desktop.jpg"
              alt="Grand Kru Technologies"
              class="w-full rounded-xl shadow-card"
            />
          </div>
          <div>
            <h5 class="text-h5 text-builder-foreground-primary mb-2">Our Story</h5>
            <h2 class="mb-4 text-builder-foreground-primary">Pioneering Excellence in Tech for Over 10 Years</h2>
            <p class="text-base leading-normal text-builder-foreground-secondary mb-6">
              Grand Kru Technologies bridges traditional business with digital innovation, empowering organizations through modern technology. Our experienced team delivers scalable solutions in web, mobile, cloud, and AI to drive growth and efficiency.
            </p>
            <p class="text-base leading-normal text-builder-foreground-secondary">
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
            <p class="text-base leading-normal text-builder-foreground-secondary mb-8">
              Our mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-lg flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal">
                  Innovation-driven solutions
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-lg flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal">
                  Client-focused approach
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-lg flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal">
                  Scalable technology
                </p>
              </div>
              <div class="flex flex-col">
                <div class="w-12 h-12 bg-builder-dark-tertiary rounded-lg flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-builder-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm leading-normal">
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

    <!-- Featured Projects Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 class="mb-2 text-builder-foreground-primary">Featured Projects</h2>
              <p class="text-base leading-normal text-builder-foreground-secondary">
                Explore our portfolio of successful technology implementations
              </p>
            </div>
            <router-link
              to="/portfolio"
              class="text-builder-foreground-primary text-sm font-medium hover:text-builder-accent-primaryHover transition-colors duration-150 mt-4 md:mt-0 inline-flex items-center gap-1"
            >
              View all Portfolio
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(project, index) in featuredProjects"
              :key="index"
              class="group cursor-pointer"
              @click="$router.push('/portfolio')"
            >
              <div class="bg-builder-dark-primary border border-builder-border-default rounded-sm overflow-hidden mb-4 aspect-video">
                <div class="w-full h-full bg-builder-dark-tertiary"></div>
              </div>
              <h3 class="text-h3 mb-2 text-builder-foreground-primary group-hover:text-builder-accent-primaryHover transition-colors duration-150">
                {{ project.title }}
              </h3>
              <p class="text-sm text-builder-foreground-secondary mb-4">
                {{ project.description }}
              </p>
              <span class="text-builder-foreground-primary text-sm font-medium inline-flex items-center gap-1">
                Read More
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-builder-dark-primary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center mb-12">
          <h5 class="text-h5 text-builder-foreground-primary mb-2">Testimonials</h5>
          <h2 class="text-builder-foreground-primary">Hear From Our Happy Clients: Their Stories</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-builder-dark-primary border border-builder-border-default rounded-sm p-6"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-builder-dark-tertiary rounded-full mr-4"></div>
              <div>
                <h5 class="text-h5 text-builder-foreground-primary">{{ testimonial.name }}</h5>
                <p class="text-sm text-builder-foreground-secondary">{{ testimonial.title }}</p>
              </div>
            </div>
            <p class="text-sm leading-normal text-builder-foreground-primary">
              {{ testimonial.quote }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 class="mb-2 text-builder-foreground-primary">Latest News & Articles</h2>
              <p class="text-base leading-normal text-builder-foreground-secondary">
                Stay updated with the latest technology trends and insights
              </p>
            </div>
            <router-link
              to="/blog"
              class="text-builder-foreground-primary text-sm font-medium hover:text-builder-accent-primaryHover transition-colors duration-150 mt-4 md:mt-0 inline-flex items-center gap-1"
            >
              View All Articles
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="(article, index) in latestNews"
              :key="index"
              class="bg-builder-dark-primary border border-builder-border-default rounded-sm overflow-hidden hover:shadow-default transition-all duration-150"
            >
              <div class="aspect-video bg-builder-dark-tertiary"></div>
              <div class="p-6">
                <h3 class="text-h5 mb-2 text-builder-foreground-primary">{{ article.title }}</h3>
                <p class="text-sm text-builder-foreground-secondary mb-4">{{ article.excerpt }}</p>
                <router-link
                  to="/blog"
                  class="text-builder-foreground-primary text-sm font-medium hover:text-builder-accent-primaryHover transition-colors duration-150 inline-flex items-center gap-1"
                >
                  Read More
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-builder-dark-primary py-20 relative overflow-hidden">
      <!-- Background gradient overlay for glassmorphism effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-builder-dark-primary via-builder-dark-secondary to-builder-dark-primary opacity-50"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-content mx-auto">
          <h2 class="mb-12 text-center text-builder-foreground-primary">Frequently Asked Question</h2>
          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq-glass-card border border-builder-border-default rounded-lg transition-all duration-300"
              :class="{ 'faq-glass-card-open': openFaqs[index] }"
            >
              <button
                class="w-full flex items-center justify-between p-6 text-left transition-all duration-300 hover:bg-white/5 rounded-t-lg"
                @click="toggleFaq(index)"
              >
                <h4 class="text-h4 text-builder-foreground-primary">{{ faq.question }}</h4>
                <svg
                  class="w-5 h-5 text-builder-accent-primary transform transition-transform duration-300"
                  :class="{ 'rotate-180': openFaqs[index] }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                v-if="openFaqs[index]"
                class="px-6 pb-6 leading-normal text-builder-foreground-secondary transition-all duration-300 animate-fade-in"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-builder-dark-secondary py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h2 class="mb-6 text-builder-foreground-primary">Ready to Transform Your Business?</h2>
          <p class="text-lg leading-normal text-builder-foreground-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss how our technology solutions can drive your business forward.
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

const featuredServices = [
  {
    title: 'Web Development',
    description: 'Custom web applications and websites built with modern technologies for optimal performance.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: 'AI Automation',
    description: 'Intelligent automation solutions powered by artificial intelligence to streamline operations.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    title: 'Financial QA',
    description: 'AI-powered financial oversight and optimization for enhanced accuracy and compliance.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    title: 'E-Commerce',
    description: 'Complete e-commerce solutions with custom payment processing and inventory management.',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    title: 'Process Automation',
    description: 'Streamline your business workflows with intelligent process automation and optimization.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
  }
]

// Services slider state
const currentServiceIndex = ref(0)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const visibleServices = computed(() => {
  if (windowWidth.value < 640) return 1
  if (windowWidth.value < 1024) return 2
  return 3
})

const totalSlides = computed(() => {
  return Math.max(1, featuredServices.length - visibleServices.value + 1)
})

const maxIndex = computed(() => totalSlides.value - 1)

const nextService = () => {
  if (currentServiceIndex.value < maxIndex.value) {
    currentServiceIndex.value++
  } else {
    currentServiceIndex.value = 0
  }
}

const prevService = () => {
  if (currentServiceIndex.value > 0) {
    currentServiceIndex.value--
  } else {
    currentServiceIndex.value = maxIndex.value
  }
}

const goToService = (index: number) => {
  currentServiceIndex.value = Math.min(index, maxIndex.value)
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Ensure currentServiceIndex is still valid after resize
  if (currentServiceIndex.value > maxIndex.value) {
    currentServiceIndex.value = maxIndex.value
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const featuredProjects = [
  {
    title: 'E-commerce Platform',
    description: 'A comprehensive e-commerce solution with integrated payment processing and real-time analytics.'
  },
  {
    title: 'Healthcare Management System',
    description: 'Integrated healthcare management platform streamlining patient records and medical billing.'
  }
]

const testimonials = [
  {
    name: 'John Smith',
    title: 'CEO, TechCorp',
    quote: 'Grand Kru Technologies transformed our digital infrastructure. Their expertise and dedication to excellence is unmatched.'
  },
  {
    name: 'Sarah Johnson',
    title: 'CTO, InnovateInc',
    quote: 'Working with Grand Kru has been a game-changer. They delivered exactly what we needed, on time and within budget.'
  },
  {
    name: 'Michael Chen',
    title: 'Founder, StartupXYZ',
    quote: 'The team at Grand Kru understood our vision and helped us build a scalable solution that grows with our business.'
  },
  {
    name: 'Emily Davis',
    title: 'Director, Enterprise Solutions',
    quote: 'Professional, reliable, and innovative. Grand Kru Technologies is our go-to partner for all technology needs.'
  },
  {
    name: 'David Wilson',
    title: 'VP Engineering, ScaleUp',
    quote: 'Their AI automation solutions have streamlined our operations significantly. Highly recommended!'
  },
  {
    name: 'Lisa Anderson',
    title: 'Operations Manager, GrowthCo',
    quote: 'Grand Kru\'s financial QA services have improved our accuracy and compliance. Outstanding results!'
  }
]

const latestNews = [
  {
    title: 'The Future of AI in Business',
    excerpt: 'Exploring how artificial intelligence is transforming modern business operations and decision-making processes.'
  },
  {
    title: 'Web Development Best Practices',
    excerpt: 'A comprehensive guide to building scalable and maintainable web applications in 2024.'
  },
  {
    title: 'Digital Transformation Strategies',
    excerpt: 'Key strategies for successfully navigating digital transformation in your organization.'
  }
]

const faqs = [
  {
    question: 'What services does Grand Kru Technologies offer?',
    answer: 'We offer a comprehensive range of technology services including web development, AI automation, financial quality assurance, e-commerce solutions, and business process automation. Our team specializes in creating scalable, innovative solutions tailored to your business needs.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a comprehensive enterprise solution could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the project.'
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive support and maintenance packages to ensure your systems continue to perform optimally. Our support includes regular updates, security patches, performance monitoring, and technical assistance.'
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We work with a wide range of modern technologies including Vue.js, React, Node.js, Python, cloud platforms (AWS, Azure, GCP), AI/ML frameworks, and various databases. We choose the best technology stack based on your specific requirements and business goals.'
  }
]

const openFaqs = ref<Record<number, boolean>>({})

const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>

<style scoped>
/* Service card titles - no gradient, hover to enlarge */
.service-card-title {
  background: none !important;
  -webkit-background-clip: unset !important;
  background-clip: unset !important;
  -webkit-text-fill-color: inherit !important;
  animation: none !important;
  transition: transform 0.2s ease-out;
  display: inline-block;
  transform-origin: left center;
}

.service-card-title:hover {
  transform: scale(1.05);
}

.faq-glass-card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-glass-card:hover {
  background-color: rgba(26, 26, 26, 0.7);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
  transform: translateY(-2px);
}

.faq-glass-card-open {
  background-color: rgba(26, 26, 26, 0.75);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 12px 40px 0 rgba(59, 130, 246, 0.2);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
