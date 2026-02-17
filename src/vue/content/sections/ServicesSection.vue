<template>
  <PageSection :id="id" variant="dark">
    <PageSectionHeader 
      title="Our *Services*" 
      subtitle="Comprehensive technology solutions tailored to your business needs" 
    />
    <PageSectionContent>
      <ArticleFeatures :features="services" />
      
      <div class="services-cta text-center mt-5 pt-4">
        <h3 class="cta-title text-white mb-3">Ready to Transform Your Business?</h3>
        <p class="cta-subtitle text-light-5 mb-4">Let us discuss how we can help you achieve your technology goals.</p>
        <router-link to="#contact" class="btn btn-primary btn-lg">
          <i class="fas fa-comments me-2"></i>
          Get a Free Consultation
        </router-link>
      </div>
    </PageSectionContent>
  </PageSection>
</template>

<script setup lang="ts">
import PageSection from "@/vue/components/layout/PageSection.vue";
import PageSectionHeader from "@/vue/components/layout/PageSectionHeader.vue";
import PageSectionContent from "@/vue/components/layout/PageSectionContent.vue";
import ArticleFeatures from "@/vue/components/articles/ArticleFeatures.vue";

interface Props {
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: "services",
});

const services = [
  { 
    title: "Web Development", 
    description: "Custom web applications built with Vue.js, React, and modern frameworks. Responsive, fast, and scalable.", 
    faIcon: "fas fa-code" 
  },
  { 
    title: "AI & Automation", 
    description: "Intelligent automation solutions that streamline operations, reduce costs, and boost productivity.", 
    faIcon: "fas fa-robot" 
  },
  { 
    title: "Financial QA", 
    description: "Specialized quality assurance for fintech applications. Compliance testing and security audits.", 
    faIcon: "fas fa-chart-line" 
  },
  { 
    title: "E-Commerce", 
    description: "End-to-end e-commerce solutions from storefront design to payment integration and fulfillment.", 
    faIcon: "fas fa-shopping-cart" 
  },
  { 
    title: "Cloud Solutions", 
    description: "Scalable cloud infrastructure on AWS and Azure. DevOps, CI/CD pipelines, and cloud migration.", 
    faIcon: "fas fa-cloud" 
  },
  { 
    title: "Tech Consulting", 
    description: "Strategic technology guidance to help you make informed decisions and build your digital roadmap.", 
    faIcon: "fas fa-lightbulb" 
  },
];
</script>

<style lang="scss" scoped>
.services-cta {
  border-top: 1px solid rgba(white, 0.1);
  padding-top: 3rem;
}

.cta-title {
  font-size: 1.75rem;
}

.cta-subtitle {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary {
  background: linear-gradient(135deg, $primary, darken($primary, 10%));
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba($primary, 0.4);
  }
}
</style>
