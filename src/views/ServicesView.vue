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
    details: 'We specialize in creating comprehensive e-commerce platforms that drive sales and enhance customer experience. Our solutions include custom payment processing, multi-national fulfillment, and analytics integration.',
    features: [
      'Custom payment gateway integration',
      'Advanced inventory management',
      'Real-time analytics dashboard',
      'Mobile-responsive design',
      'Secure checkout process'
    ],
    technologies: ['WordPress', 'Gravity Forms', 'Stripe', 'PHP', 'WooCommerce']
  },
  {
    title: 'Website Development',
    summary: 'End-to-end website solutions from design to deployment, ensuring optimal user experience and performance.',
    details: 'We provide complete website development services, creating custom solutions that align with your business goals. Our team handles everything from initial design to final deployment, ensuring your website is not only visually appealing but also functional, responsive, and optimized for search engines.',
    features: [
      'Custom website development',
      'Ongoing maintenance and support',
      'Content management system integration',
      'Search engine optimization',
      'Performance optimization'
    ],
    technologies: ['HTML/CSS', 'JavaScript', 'WordPress', 'React', 'Vue.js']
  },
  {
    title: 'Financial Quality Assurance',
    summary: 'AI-powered financial oversight and optimization for enhanced accuracy and compliance.',
    details: 'Our Financial Quality Assurance service is designed to bring together expert financial oversight with cutting-edge technology. Beyond traditional bookkeeping, we use AI-assisted tools for auditing, planning, implementation, and continuous optimization. Our service identifies inconsistencies early, streamlines financial workflows, strengthens internal controls, and enhances regulatory compliance — all while delivering real-time insights through intelligent automation. By integrating predictive analytics, automated reporting, and proactive monitoring, we help businesses maintain financial accuracy, reduce risks, and unlock smarter decision-making.',
    features: [
      'AI-assisted financial auditing',
      'Real-time financial insights',
      'Predictive analytics integration',
      'Automated reporting systems',
      'Proactive risk monitoring'
    ],
    technologies: ['AI/ML', 'Quickbooks','Financial Analytics', 'Zapier', 'Compliance Systems']
  },
  {
    title: 'Software Development',
    summary: 'Custom software solutions using modern Rails and Node.js stacks for scalable applications.',
    details: 'We develop powerful, scalable software applications using Ruby on Rails and Node.js. Our team specializes in creating custom solutions that meet your specific business needs, from API development to full-stack applications.',
    features: [
      'Full-stack application development',
      'RESTful API design and implementation',
      'Database architecture and optimization',
      'Cloud deployment and scaling',
      'Continuous integration and deployment'
    ],
    technologies: ['Ruby on Rails', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Git']
  },
  {
    title: 'Business Process Automation',
    summary: 'Technology-driven workflow optimization and automation for enhanced operational efficiency.',
    details: "We specialize in Business Process Automation by leveraging the latest technology tools to analyze, plan, and implement efficient, scalable solutions. Our approach starts with a deep analysis of existing workflows, identifying bottlenecks and opportunities for improvement. We use advanced planning tools to design automation strategies tailored to each organization's goals, ensuring seamless integration into daily operations. Our implementation process focuses not only on technical deployment but also on supporting broader organizational development—helping teams adapt, grow, and thrive with new systems in place. Through continuous monitoring and data-driven insights, we provide measurable results, demonstrating clear improvements in efficiency, cost savings, and overall performance.",
    features: [
      'Workflow analysis and optimization',
      'Custom automation strategies',
      'Seamless system integration',
      'Organizational change management',
      'Performance monitoring and analytics'
    ],
    technologies: ['Process Automation', 'Workflow Management', 'Data Analytics', 'Integration Tools']
  },
  {
    title: 'Training',
    summary: 'Specialized business tool training and process implementation for enhanced operational efficiency.',
    details: 'We provide in-depth training programs that help businesses effectively implement and utilize modern tools and processes. Our training covers everything from basic tool usage to advanced process optimization, ensuring your team can maximize the value of your technology investments. Through hands-on workshops, video tutorials, and practical exercises, we help organizations streamline their operations and improve productivity.',
    features: [
      'Business tool implementation training',
      'Process documentation and standardization',
      'Video tutorial creation and management',
      'Workflow optimization guidance',
      'Team adoption and change management'
    ],
    technologies: ['Training Platforms', 'Video Production', 'Process Documentation', 'Change Management']
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